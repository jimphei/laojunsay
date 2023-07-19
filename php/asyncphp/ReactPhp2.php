<?php

require __DIR__ . '/vendor/autoload.php';

$browser = new React\Http\Browser();
$url = 'https://www.baidu.com/?i=';
$start = microtime(true);

for ($i=0; $i < 500; $i++) { 
    $browser->get($url.$i)->then(function (Psr\Http\Message\ResponseInterface $response) use($i,$start){
        $result = $response->getBody();
        echo "第{$i}次访问百度完成，用时：".microtime(true)-$start."\n";
    }, function (Exception $e) {
        echo 'Error: ' . $e->getMessage() . PHP_EOL;
    });
}

