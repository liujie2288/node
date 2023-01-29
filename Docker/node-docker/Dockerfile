# 基于node最新版本作为基础镜像，更多信息参考：https://docs.docker.com/build/building/base-images/
# FROM代表一个构建阶段，一个Dockerfile文件中可以存在多个构建阶段
# as 给当前阶段打一个标签，方便其它阶段引用
FROM node as base
# 设置容器内部工作目录，方便进入容器直接执行其他命令，而不需要每次都cd到该目录中
WORKDIR /app
# 将源代码拷贝到镜像中（如果文件是压缩包会自动解压）
COPY . .
# 输出当前目录
RUN ls

# 测试阶段
FROM base as test
# 安装环境依赖
RUN npm ci
# 运行测试
RUN npm run test

# 生产阶段
FROM base as prod
# 安装生产依赖
RUN npm ci --production
# 容器启动时，自动启动node服务
CMD node server.js
