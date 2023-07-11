<?php
class AsyncPhp{

    public function curl($url)
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        $output = curl_exec($ch);
        curl_close($ch);
        return $output;
    }

    public function testSync(){
        $url = 'https://www.baidu.com/?i=';
        $start=microtime(true);    
        for($i=0;$i<5;$i++){
            $this->curl($url.$i);
            echo '访问第'.($i+1).'次百度'."\n";
        }
        $end=microtime(true);

        echo "\n总用时",$end-$start."\n";        
    }

    public function testAsync(){
        $url = 'https://www.baidu.com/?i=';
        $start=microtime(true); 
        $i=0;
        while($i<5){
            $pids[$i] = pcntl_fork(); //创建子进程
             if($pids[$i] == 0){
                 $this->curl($url.$i);; //子进程执行代码
                 exit(0);
             }
             $i++;
         }
         //等待进程关闭
         for($i=0;$i<5;$i++){
             pcntl_waitpid($pids[$i],$status,WUNTRACED);//等待进程结束
             if(pcntl_wifexited($status)){
                 //子进程完成退出
                 echo '第'.$i.'次访问百度，用时:'.microtime(true)-$start."\n";
             }
         } 

        $end=microtime(true);
        echo "\n总用时",$end-$start."\n";        
    }
    
    public function getCurl($url)
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        return $ch;
    }  
      
    public function testCurlMulti(){
        $url = 'https://www.baidu.com/?i=';
        $start=microtime(true); 
        $mh = curl_multi_init();

        $curl_array = array();
        for ($i=0; $i < 5; $i++) { 
            $curl_array[$i] = $this->getCurl($url.$i);
            curl_multi_add_handle($mh, $curl_array[$i]);
        }
        $running = NULL;
        do {
            curl_multi_exec($mh,$running);
        } while($running > 0);

        foreach($curl_array as $i=>$item){
            $cotnent = curl_multi_getcontent($curl_array[$i]);
            echo '第'.$i.'次访问百度，用时:'.microtime(true)-$start."\n";
            curl_multi_remove_handle($mh, $curl_array[$i]);
        }
        curl_multi_close($mh);  

        $end=microtime(true);

        echo "\n总用时",$end-$start."\n";            
    }
}

$tester = new AsyncPhp();
$tester->testCurlMulti();
