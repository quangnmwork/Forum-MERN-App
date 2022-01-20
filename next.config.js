const removeImports = require("next-remove-imports")();

module.exports = removeImports({
  images: {
    domains: ["res.cloudinary.com"],
  },
});
