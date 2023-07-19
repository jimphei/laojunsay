<?php

function curl($url)
{
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    $output = curl_exec($ch);
    curl_close($ch);
    return $output;
}
function callback($i){
    $url = 'https://www.baidu.com/?i=';
    return curl($url.$i);
};

$start = microtime(true);
$fibers = [];
for ($i=0; $i < 500; $i++) { 
    $fibers[$i] = new Fiber(function($i,$start):void{
        $result = callback($i);
        Fiber::suspend($i);
        echo "第{$i}次访问百度，用时：".microtime(true)-$start."\n";
    });
    $fibers[$i]->start($i,$start);
}

for ($i=0; $i < 5; $i++) { 
    while (!$fibers[$i]->isTerminated()) {
        $ret = $fibers[$i]->resume();
    }
}

/*
$urls = [
    '1'=>'https://www.baidu.com/?i=1',
    '2'=>'https://www.baidu.com/?i=2',
    '3'=>'https://www.baidu.com/?i=3',
    '4'=>'https://www.baidu.com/?i=4',
    '5'=>'https://www.baidu.com/?i=5',
];

$fiber = new Fiber(function(array $urls):void{
    global $start;
    foreach ($urls as $i => $url) {
        Fiber::suspend($i);
        $result = callback($i);
        echo "第{$i}次访问百度，用时：".microtime(true)-$start."\n";        
    }
});

$copied = $fiber->start($urls);

while(!$fiber->isTerminated()) {
    $ret = $fiber->resume();
}
*/