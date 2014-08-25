var delegate = require('client/delegate');
var xhr = require('client/xhr');
var ImageUploader = require('client/imageUploader');
var notify = require('client/notify');

function PhotoChanger() {
  this.elem = document.body.querySelector('[data-action="photo-change"]');

  this.img = this.elem;
  this.elem.addEventListener('click', function(event) {
    event.preventDefault();
    this.changePhoto();
  }.bind(this));
}

PhotoChanger.prototype.changePhoto = function() {
  var fileInput = document.createElement('input');
  fileInput.type = 'file';

  var self = this;
  fileInput.onchange = function() {
    self.upload(this.files[0]);
  };
  fileInput.click();
};

PhotoChanger.prototype.updateUserPhoto = function(link) {

  var self = this;

  var request = xhr({
    method: 'PATCH',
    url: '/users/me'
  });

  request.send({photo: link});

  request.addEventListener('success', function(event) {
    self.img.src = event.result.photo.replace(/(\.\w+)$/, window.devicePixelRatio > 1 ? 'm$1' : 't$1');
  });

};


PhotoChanger.prototype.upload = function(file) {
  var request = new ImageUploader(file).upload();

  var self = this;
  request.addEventListener('success', function(e) {
    if (this.status == 400) {
      notify.error("Неверный тип файла или изображение повреждено.");
      return;
    }

    if (e.result.data.width < 160 || e.result.data.height < 160) {
      notify.error("Минимальное разрешение 160x160, лучше 320px.");
      return;
    }

    self.updateUserPhoto(e.result.data.link);
  });

};

delegate.delegateMixin(PhotoChanger.prototype);

module.exports = PhotoChanger;