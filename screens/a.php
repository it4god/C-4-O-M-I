<?php


$sql = "SELECT articles.id, articles.title, article_item_category.category_id, article_category.name, articles.url from articles INNER JOIN article_item_category ON articles.id = article_item_category.article_id INNER JOIN article_category ON article_item_category.category_id = article_category.category_id WHERE articles.id IN ( SELECT articles.id from articles INNER JOIN article_item_category ON articles.id = article_item_category.article_id INNER JOIN article_category ON article_item_category.category_id = article_category.category_id WHERE articles.title LIKE '%" .  $_GET['keyword'] . "%' LIMIT 1 ) LIMIT 10000";
 ?>