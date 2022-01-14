const removeImports = require("next-remove-imports")();

const MD = (phase, { defaultConfig }) => {
  return removeImports({
    ...defaultConfig,
  });
};
module.exports = {
  MD,
  images: {
    domains: ["res.cloudinary.com"],
  },
};
