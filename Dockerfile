FROM gdssingapore/airbase:node-20
WORKDIR /app
RUN npm install -g serve
COPY --chown=app:app . ./
USER app
ENV PORT=3000
EXPOSE 3000
CMD ["serve", "-s", ".", "-l", "3000"]
