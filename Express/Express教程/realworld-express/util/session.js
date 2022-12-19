exports.sessionSave = exports.sessionRegenerate = (req) =>
  new Promise(function (resolve, reject) {
    req.session.save(function (err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });

exports.sessionRegenerate = (req) =>
  new Promise(function (resolve, reject) {
    req.session.regenerate(function (err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
