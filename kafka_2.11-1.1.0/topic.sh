#!/bin/bash
OUTPUT1=$(bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic get_dashboard)
echo “${OUTPUT1}"
OUTPUT2=$(bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic get_home)
echo “${OUTPUT2}"
OUTPUT3=$(bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic get_inbox)
echo “${OUTPUT3}"
OUTPUT4=$(bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic get_profile)
echo “${OUTPUT4}"
OUTPUT5=$(bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic get_propertydetails)
echo “${OUTPUT5}"
OUTPUT6=$(bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic get_propertyphotos)
echo “${OUTPUT6}"
OUTPUT7=$(bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic get_searchresults)
echo “${OUTPUT7}"
OUTPUT8=$(bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic post_book)
echo “${OUTPUT8}"
OUTPUT9=$(bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic post_bookproperty)
echo “${OUTPUT9}"
OUTPUT10=$(bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic post_login)
echo “${OUTPUT10}"
OUTPUT11=$(bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic post_lyp)
echo “${OUTPUT11}"
OUTPUT12=$(bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic post_ownerlogin)
echo “${OUTPUT12}"
OUTPUT13=$(bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic post_profile)
echo “${OUTPUT13}"
OUTPUT14=$(bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic post_sendmessage)
echo “${OUTPUT14}"
OUTPUT15=$(bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic post_signup)
echo “${OUTPUT15}"
OUTPUT16=$(bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic response_topic)
echo “${OUTPUT16}"
OUTPUT17=$(bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic get_transaction_history)
echo “${OUTPUT17}"
OUTPUT18=$(bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic post_buyproperty)
echo “${OUTPUT18}"