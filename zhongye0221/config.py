
from flask import Flask
from datetime import timedelta

import logging
from redis import StrictRedis

import redis



class Config(object):
    """配置信息"""
    SECRET_KEY = "iECgbYWReMNxkRprrzMo5KAQYnb2UeZ3bwvReTSt+VSESW0OB8zbglT+6rEcDW9X"

    DEBUG = True
    # 数据库的配置信息，假设数据库名字为search
    SQLALCHEMY_DATABASE_URI = "mysql://root:mysql@127.0.0.1:3306/zhongye"
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # redis的配置
    REDIS_HOST = "127.0.0.1"
    REDIS_PORT = 6379

    # Session 保存设置
    # SESSION_TYPE = "redis"
    # 开启session签名
    SESSION_USE_SIGNER = True
    # 指定Session保存的redis
    # SESSION_REDIS = StrictRedis(host=REDIS_HOST, port=REDIS_PORT)
    # 设置需要过期
    SESSION_PERMANENT = False
    # 设置过期时间
    # PERMANENT_SESSION_LIFETIME = 1 * 60
    # PERMANENT_SESSION_LIFETIME = timedelta(days=1)

    # 设置日志等级
    LOG_LEVEL = logging.DEBUG


