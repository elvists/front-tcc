FROM nginx:mainline

COPY ./build/ /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

# rodar -> sudo docker run -p 8000:80 uploader

