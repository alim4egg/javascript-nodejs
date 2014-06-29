# Загрузка скриптов, картинок, фреймов: onload и onerror

Браузер позволяет отслеживать загрузку внешних ресурсов -- скриптов, ифреймов, картинок и других.

Для этого есть два события:
<ul>
<li>`onload` -- если загрузка успешна.</li>
<li>`onerror` -- если при загрузке произошла ошибка.</li>
</ul>

## Загрузка `SCRIPT`

Рассмотрим следующую задачу. 

В браузере работает сложный интерфейс и, чтобы создать очередной компонент, нужно загрузить скрипт с сервера.

Подгрузить внешний скрипт -- достаточно просто: 
[js]
var script = document.createElement('script');
script.src = "my.js";

document.documentElement.appendChild(script);
[/js]

...Но, как подгрузки выполнить функцию из этого скрипта? Конечно, можно вызвать её в самом скрипте, но если скрипт -- это универсальная библиотека, то это было бы неправильно.

[ref id="onload"]
### `script.onload`

Первым нашим помощником станет событие `onload`.

**Событие `onload` сработает, когда скрипт загрузился *и* выполнился.**

Например:
[js run]
var script = document.createElement('script');
script.src = "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.js"
document.documentElement.appendChild(script);

*!*
script.onload = function() {
  alert(jQuery); 
}
*/!*
[/js]

Это даёт возможность, как в примере выше, получить переменные из скрипта и выполнять объявленные в нём функции.

...А что, если загрузка скрипта не удалась? Например, такого скрипта на сервере нет (ошибка 404) или сервер "упал" (ошибка 500). 

По-хорошему, такое тоже нужно как-то обрабатывать, хотя бы сообщить посетителю о возникшей проблеме.

[ref id="onerror"]
### `script.onerror`

Любые ошибки загрузки (но не выполнения) скрипта отслеживаются обработчиком `onerror`.

Например, для заведомо отсутствующего скрипта:

[js run]
var script = document.createElement('script');
script.src = "http://example.com/404.js"
document.documentElement.appendChild(script);

*!*
script.onerror = function() {
  alert("Ошибка: " + this.src); 
};
*/!*
[/js]

[ref id="onreadystatechange"]
### IE8-: `script.onreadystatechange`

Примеры выше работают во всех браузерах, кроме IE8-.

В IE для отслеживания загрузки есть другое событие: `onreadystatechange`. Оно срабатывает многократно, при каждом обновлении состояния загрузки.

Текущая стадия процесса находится в `script.readyState`:
<dl>
<dt>`loading`</dt>
<dd>В процессе загрузки.</dd>
<dt>`loaded`</dt>
<dd>Получен ответ с сервера -- скрипт или ошибка. Скрипт на фазе `loaded` может быть ещё не выполнен.</dd>
<dt>`complete`</dt>
<dd>Скрипт выполнен.</dd>
</dl>

Например, рабочий скрипт:

[js run]
var script = document.createElement('script');
script.src = "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.js";
document.documentElement.appendChild(script);

*!*
script.onreadystatechange = function() {
  alert(this.readyState); // loading -> loaded -> complete
}
*/!*
[/js]

Скрипт с ошибкой:

[js run]
var script = document.createElement('script');
script.src = "http://ajax.googleapis.com/404.js";
document.documentElement.appendChild(script);

*!*
script.onreadystatechange = function() {
  alert(this.readyState);  // loading -> loaded
}
*/!*
[/js]

Обратим внимание на две особенности:
<ul>
<li>**Стадии могут пропускаться.** 

Если скрипт в кэше браузера -- он сразу даст `complete`. Вы можете увидеть это, если несколько раз запустите первый пример.</li>
<li>**Нет особой стадии для ошибки.** 

В примере выше это видно, обработка останавливается на `loaded`.
</li>
</ul>

Итак, самое надёжное средство для IE8- поймать загрузку (или ошибку загрузки) -- это повесить обработчик на событие `onreadystatechange`, который будет срабатывать и на стадии `complete` и на стадии `loaded`. Так как скрипт может быть ещё не выполнен к этому моменту, то вызов функции лучше сделать через `setTimeout(.., 0)`. 

Пример ниже вызывает `afterLoad` после загрузки скрипта и работает только в IE:

[js run]
var script = document.createElement('script');
script.src = "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.js";
document.documentElement.appendChild(script);

function afterLoad() {
  alert("Загрузка завершена: " + typeof(jQuery));
}

*!*
script.onreadystatechange = function() {
  if (this.readyState == "complete") { // на случай пропуска loaded
    afterLoad(); // (2)
  }

  if (this.readyState == "loaded") {
    setTimeout(afterLoad, 0);  // (1)
    
    // убираем обработчик, чтобы не сработал на complete
    this.onreadystatechange = null; 
  }
}
*/!*
[/js]

Вызов `(1)` выполнится при первой загрузке скрипта, а `(2)` -- при второй, когда он уже будет в кеше, и стадия станет сразу `complete`.

Функция `afterLoad` может и не обнаружить `jQuery`, если при загрузке была ошибка, причём не важно какая -- файл не найден или синтаксис скрипта ошибочен.

### Кросс-браузерное решение

Для кросс-браузерной обработки загрузки скрипта или её ошибки поставим обработчик на все три события: `onload`, `onerror`, `onreadystatechange`.

Пример ниже выполняет функцию `afterLoad` после загрузки скрипта *или* при ошибке. 

Работает во всех браузерах:

[js run]
var script = document.createElement('script');
script.src = "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.js";
document.documentElement.appendChild(script);

function afterLoad() {
  alert("Загрузка завершена: " + typeof(jQuery));
}

script.onload = script.onerror = function() {
  if (!this.executed) { // выполнится только один раз
    this.executed = true;
    afterLoad();
  }
};

script.onreadystatechange = function() {
  var self = this;
  if (this.readyState == "complete" || this.readyState == "loaded") {
    setTimeout(function() { self.onload() }, 0);// сохранить "this" для onload
  }
};
[/js]


## Загрузка других ресурсов

Поддержка этих событий для других типов ресурсов различна:

<dl>
<dt>`<img>`, `<link>` (стили)</dt>
<dd>Поддерживает `onload/onerror` во всех браузерах.</dd>
<dt>`<iframe>`</dt>
<dd>Поддерживает `onload` во всех браузерах. Это событие срабатывает как при успешной загрузке, так и при ошибке. 

Обратим внимание, что если `<iframe>` загружается с того же домена, то можно, используя `iframe.contentWindow.document` получить ссылку на документ и поставить обработчик `DOMContentLoaded`. А вот если `<iframe>` -- с другого домена, то так не получится, однако сработает `onload`. 
</dd>
</dl>

## Итого

В этой статье мы рассмотрели события `onload/onerror` для ресурсов.

Их можно обобщить, разделив на рецепты:

<dl>
<dt>Отловить загрузку скрипта (включая ошибку)</dt>
<dd>Ставим обработчики на `onload` + `onerror` + (для IE8-) `onreadystatechange`, как указано в рецепте выше</dd>
<dt>Отловить загрузку картинки `<img>` или стиля `<link>`</dt>
<dd>Ставим обработчики на `onload` + `onerror`
[js]
var img = document.createElement('img');
img.onload = function() { alert("Успех "+this.src };
img.onerror = function() { alert("Ошибка "+this.src };
img.src = ...
[/js]
Изображения начинают загружаться сразу при создании, не нужно их для этого вставлять в HTML.

**Чтобы работало в IE8-, `src` нужно ставить *после* `onload/onerror`.**
</dd>
<dt>Отловить загрузку `<iframe>`</dt>
<dd>Поддерживается только обработчик `onload`. Он сработает, когда `IFRAME` загрузится, со всеми подресурсами, а также в случае ошибки.
</dd>
</dl>

[task id=451]
[task id=492]
[task id=452]
[task id=453]