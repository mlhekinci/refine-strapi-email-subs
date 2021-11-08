"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

module.exports = {
  async create(ctx) {
    let entity;
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.messages.create(data, { files });
    } else {
      entity = await strapi.services.messages.create(ctx.request.body);
    }

    entity = sanitizeEntity(entity, { model: strapi.models.messages });

    const { subject, text } = entity;

    const workers = (await strapi.services.subscribers.find()).map(
      (subscriber) => {
        let to = subscriber.email;

        return strapi.plugins["email"].services.email.send({
          subject,
          text,
          to,
        });
      }
    );
    
    await Promise.all(workers);

    return entity;
  },
};
