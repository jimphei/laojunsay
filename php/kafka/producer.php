<?php
$conf = new RdKafka\Conf();
$conf->set('log_level', (string) LOG_DEBUG);
$conf->set('debug', 'all');
$rk = new RdKafka\Producer($conf);
$rk->addBrokers("81.68.115.83:9092");
$topic = $rk->newTopic("electric");
$topic->produce(RD_KAFKA_PARTITION_UA, 0, "我是生产者1");
$rk->flush(1000);