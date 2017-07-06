import Koa from 'koa'
import convert from 'koa-convert'
import onerror from 'koa-onerror'
import Router from 'koa-router'

const app = new Koa()
onerror(app)