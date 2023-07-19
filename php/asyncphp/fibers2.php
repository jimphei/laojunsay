<?php
declare(ticks=1);//Zend引擎每执行1条低级语句就去执行一次 register_tick_function() 注册的函数

class Thread {
    
  protected static $names = [];
  protected static $fibers = [];
  protected static $params = [];

  public static function register(string|int $name, callable $callback, array $params)
  {
    self::$names[]  = $name;
    self::$fibers[] = new Fiber($callback);
    self::$params[] = $params;
  }


  public static function run() {
    $output = [];
    while (self::$fibers) {
      foreach (self::$fibers as $i => $fiber) {
          try {
              if (!$fiber->isStarted()) {
                  // Register a new tick function for scheduling this fiber
                  register_tick_function('Thread::scheduler');
                  $fiber->start(...self::$params[$i]);
              } elseif ($fiber->isTerminated()) {
                  $output[self::$names[$i]] = $fiber->getReturn();
                  unset(self::$fibers[$i]);
              } elseif ($fiber->isSuspended()) {
                $fiber->resume();
              }                
          } catch (Throwable $e) {
              $output[self::$names[$i]] = $e;
          }
      }
    }

    return $output;
  }

  public static function scheduler () {
    if(Fiber::getCurrent() === null) {
      return;
    }
    // running Fiber::suspend() in this if condition will prevent an infinite loop!
    if(count(self::$fibers) > 1)
    {
      Fiber::suspend();
    }
  }
}


$start = microtime(true);
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

// registering 6 Threads (A, B, C, D, E, and F)
foreach(range(1, 5) as $id) {
  Thread::register($id, function($id,$start){
    $result = callback($id);
    return microtime(true) - $start;//放回用时。
  }, [$id,$start]);
}

// run threads and wait until execution finishes
$outputs = Thread::run();
print_r($outputs);