# 基于node12.18.1版本作为基础镜像，更多信息参考：https://docs.docker.com/build/building/base-images/
FROM node:12.18.1
# 设定应用程序运行的环境变量
ENV NODE_ENV production
# 设置容器内部工作目录，方便进入容器直接执行其他命令，而不需要每次都cd到该目录中
WORKDIR /app
# 将源代码拷贝到镜像中（如果文件是压缩包会自动解压）
COPY . .
# 安装生产环境依赖
RUN npm install --production
# 容器启动时，自动启动node服务
CMD node server.js