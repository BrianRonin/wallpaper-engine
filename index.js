((doc, win) => {
  const createTextSetter = (selector) => {
    const elem = doc.querySelector(selector);
    let text;
    return (newText) => {
      //   if (newText !== text) {
      //     text = newText;
      //     elem.textContent = newText;
      //     return true;
      //   }
      text = newText;
      elem.innerHTML = newText;
      return true;
      // else {
      // return false
      // }
    };
  };

  const otherVariable = {
    set_12_24: "24",
    from_friend_tips: false,
    birthday: false,
    pre_birthday: "",
    birthday_string: "",
    birthday_string_type: "a",
    suf_birthday: "",
    text_background_color: {
      rgb: "",
      a: "",
    },
    body_background_color: "",
  };

  const timeMask = {
    year: doc.querySelector("#date>.mask#year>.p"),
    month: doc.querySelector("#date>.mask#month>.p"),
    d: doc.querySelector("#date>.mask#d>.p"),
    h: doc.querySelector("#time>.mask#h>.p"),
    m: doc.querySelector("#time>.mask#m>.p"),
  };

  const setters = {
    time: createTextSetter("#time_div"),
    date: createTextSetter("#date_div"),
  };
  let data = document.getElementById("#date_divv");

  doc.addEventListener("DOMContentLoaded", () => {
    const updateText = (_) => {
      const now = new Date();

      if (now.getHours() === 0) return verificar();

      setters.date(
        "<span class='data-div'>" +
          "<span id='ano'>" +
          now.getFullYear() +
          "</span>" +
          "<hr>" +
          "<span id='dia'>" +
          now.getDate().toFixed().padStart(2, "0") +
          "</span>" +
          " " +
          "<span id='mes'>" +
          (now.getMonth() + 1).toFixed().padStart(2, "0") +
          "</span> " +
          "</span> "
      );

      let timeDiv;
      if (otherVariable.set_12_24 === "12") {
        let hour = now.getHours();
        hour = hour > 12 ? hour - 12 : hour;
        timeDiv =
          "<span class='time_div'>" +
          "<span class='horas'>" +
          hour.toFixed().padStart(2, "0") +
          "</span>" +
          " ";
      } else {
        timeDiv =
          "<span class='horas'>" + now.getHours().toFixed().padStart(2, "0");
        +" ola" + "</span>";
      }

      timeDiv +=
        "<span class='minutos'>" +
        " " +
        now.getMinutes().toFixed().padStart(2, "0") +
        " " +
        "</span>";

      const second = now.getSeconds();
      if (
        setters.time(
          timeDiv +
            "<span class='segundos'>" +
            second.toFixed().padStart(2, "0") +
            "</span>" +
            "</span>"
        )
      ) {
        const minAndSec = second + 60 * now.getMinutes();
        const day =
          ((now.getDate() - 1) * 86400 + minAndSec + 3600 * now.getHours()) /
          (new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate() *
            86400);
        timeMask.year.style.maxWidth = `${(now.getMonth() + day) / 0.12}%`;
        timeMask.month.style.maxWidth = `${day * 100}%`;
        timeMask.d.style.maxWidth = `${
          (minAndSec + 3600 * now.getHours()) / 864
        }%`;
        timeMask.h.style.maxWidth = `${minAndSec / 36}%`;
        timeMask.m.style.maxWidth = `${second / 0.6}%`;
      }
      if (otherVariable.from_friend_tips === true) {
        doc.getElementById("friend_div").style.display = "inline";
        if (otherVariable.birthday === true) {
          doc.querySelector(".birthday").style.display = "inline";
          let totalDays;
          let number = now.getTime() - otherVariable.birthday_string;
          if (otherVariable.birthday_string_type === "b") {
            totalDays = 28000 - Math.floor(number / 86400000);
          } else if (otherVariable.birthday_string_type === "a") {
            totalDays =
              Math.floor(number / (86400000 * 365)) +
              "???" +
              Math.floor(((number / 86400000) % 365) / 30) +
              "?????????" +
              Math.floor(((number / 86400000) % 365) % 30) +
              "???";
          }
          doc.getElementById("birthday_div").textContent =
            otherVariable.pre_birthday + totalDays + otherVariable.suf_birthday;
        } else {
          doc.querySelector(".birthday").style.display = "none";
        }
      } else {
        doc.getElementById("friend_div").style.display = "none";
      }
    };
    setInterval(updateText, 1000);
    updateText();
  });

  win.wallpaperPropertyListener = {
    applyUserProperties(properties) {
      if (properties["date_size"])
        doc.getElementById("date").style.fontSize =
          properties["date_size"].value + "px";
      if (properties["time_size"])
        doc.getElementById("time").style.fontSize =
          properties["time_size"].value + "px";
      if (properties["header_slogan"])
        doc.getElementById("header_slogan").textContent =
          properties["header_slogan"].value;
      if (properties["header_slogan_size"])
        doc.getElementById("header_slogan").style.fontSize =
          properties["header_slogan_size"].value + "px";
      if (properties["footer_slogan"])
        doc.getElementById("footer_slogan").textContent =
          properties["footer_slogan"].value;
      if (properties["footer_slogan_size"])
        doc.getElementById("footer_slogan").style.fontSize =
          properties["footer_slogan_size"].value + "px";
      if (properties["min_color"]) {
        const backgroundColor =
          "rgb(" + translateColor(properties["min_color"].value) + ")";
        doc.getElementById("m").style.borderColor = backgroundColor;
        timeMask.m.style.backgroundColor = backgroundColor;
      }
      if (properties["hour_color"]) {
        const backgroundColor =
          "rgb(" + translateColor(properties["hour_color"].value) + ")";
        doc.getElementById("h").style.borderColor = backgroundColor;
        timeMask.h.style.backgroundColor = backgroundColor;
      }
      if (properties["month_color"]) {
        const backgroundColor =
          "rgb(" + translateColor(properties["month_color"].value) + ")";
        doc.getElementById("month").style.borderColor = backgroundColor;
        timeMask.month.style.backgroundColor = backgroundColor;
      }
      if (properties["year_color"]) {
        const backgroundColor =
          "rgb(" + translateColor(properties["year_color"].value) + ")";
        doc.getElementById("year").style.borderColor = backgroundColor;
        timeMask.year.style.backgroundColor = backgroundColor;
      }
      if (properties["day_color"]) {
        const backgroundColor =
          "rgb(" + translateColor(properties["day_color"].value) + ")";
        doc.getElementById("d").style.borderColor = backgroundColor;
        timeMask.d.style.backgroundColor = backgroundColor;
        // timeMask.dia.style.color = backgroundColor;
      }
      if (properties["text_color"]) {
        doc.getElementById("text").style.color =
          "rgb(" + translateColor(properties["text_color"].value) + ")";
      }
      if (properties["position_h"]) {
        doc.getElementsByTagName("body").item(0).style.alignItems =
          properties["position_h"].value;
      }
      if (properties["position_v"]) {
        doc.getElementsByTagName("body").item(0).style.justifyContent =
          properties["position_v"].value;
      }
      if (properties["12_24"]) {
        otherVariable.set_12_24 = properties["12_24"].value;
      }
      if (properties["from_friend_tips"]) {
        otherVariable.from_friend_tips = properties["from_friend_tips"].value;
      }
      if (properties["birthday"]) {
        otherVariable.birthday = properties["birthday"].value;
      }
      if (properties["birthday_string"]) {
        let startDate = properties["birthday_string"].value.replace(
          new RegExp("\\D", "g"),
          "/"
        );
        otherVariable.birthday_string = new Date(startDate).getTime();
      }
      if (properties["prefix_birthday_string"]) {
        otherVariable.pre_birthday = properties["prefix_birthday_string"].value;
      }
      if (properties["suffix_birthday_string"]) {
        otherVariable.suf_birthday = properties["suffix_birthday_string"].value;
      }
      if (properties["birthday_string_size"]) {
        doc.getElementById("birthday_div").style.fontSize =
          properties["birthday_string_size"].value + "px";
      }
      if (properties["birthday_string_type"]) {
        otherVariable.birthday_string_type =
          properties["birthday_string_type"].value;
      }
      if (properties["body_color"]) {
        const color = translateColor(properties["body_color"].value);
        doc.getElementById("text").style.backgroundColor =
          "rgba(" + color + "," + otherVariable.text_background_color.a + ")";
        doc.getElementsByTagName("body").item(0).style.backgroundColor =
          "rgb(" + color + ")";
        otherVariable.body_background_color = color;
      }
      if (properties["background_image"]) {
        if (!properties["background_image"].value) {
          doc.getElementById("text").style.backgroundColor =
            "rgba(" + otherVariable.body_background_color + ",0)";
        } else {
          doc.getElementById("text").style.backgroundColor =
            "rgba(" +
            otherVariable.text_background_color.rgb +
            "," +
            otherVariable.text_background_color.a +
            ")";
        }
        doc.getElementsByTagName("body").item(0).style.backgroundImage =
          'url("' + "file:///" + properties["background_image"].value + '")';
      }
      if (
        properties["text_opacity_color"] &&
        doc
          .getElementsByTagName("body")
          .item(0)
          .style.backgroundImage.toString() !== 'url("file:///")'
      ) {
        const customColor = translateColor(
          properties["text_opacity_color"].value
        );
        doc.getElementById("text").style.backgroundColor =
          "rgba(" +
          customColor +
          "," +
          (otherVariable.text_background_color.a
            ? otherVariable.text_background_color.a
            : 0) +
          ")";
        otherVariable.text_background_color.rgb = customColor;
      }
      if (properties["text_opacity"]) {
        doc.getElementById("text").style.backgroundColor =
          "rgba(" +
          otherVariable.text_background_color.rgb +
          "," +
          properties["text_opacity"].value +
          ")";
        otherVariable.text_background_color.a =
          properties["text_opacity"].value;
      }
      if (properties["scroll_size"]) {
        for (const elementsByClassNameElement of doc.getElementsByClassName(
          `mask`
        )) {
          elementsByClassNameElement.style.width =
            properties["scroll_size"].value * 5.3 + "px";
        }
      }
    },
  };

  ////////////////// MEU CODIGO ////////////////////////

  function addDays(date, days) {
    let result = date.setDate(date.getDate() + days);
    return new Date(result);
  }

  let adm = false; ///////30, 31, 32////////////
  const eHoje = (dia) => {
    let diaDeTreino = localStorage.getItem("diaDeTreino");
    diaDeTreino = JSON.parse(diaDeTreino);
    diaDeTreino = new Date(diaDeTreino);
    console.log(dia);
    let today = new Date();
    if (dia === 0) {
      today = addDays(today, 3);
    }
    if (dia === 1) {
      today = addDays(today, 2);
    }
    if (dia === 2) {
      today = addDays(today, 1);
    }
    if (dia === 123) return true;
    console.log(diaDeTreino.getDate(), today.getDate());
    if (adm === false) {
      return (
        diaDeTreino.getDate() == today.getDate() &&
        diaDeTreino.getMonth() == today.getMonth() &&
        diaDeTreino.getFullYear() == today.getFullYear()
      );
    } else return false;
  };

  ///////////// verifica????o /////////////
  const btn3 = document.getElementById("passou-do-dia");
  const btn = document.getElementById("dia-de-treino-btn");
  function setarData(passou) {
    if (passou) {
      btn3.style.display = "block";
    } else {
      btn.style.display = "block";
    }
    btn.addEventListener("click", function () {
      setar();
    });
    btn3.addEventListener("click", function () {
      setar();
    });
    function setar() {
      diaDeTreino = new Date();
      console.log(diaDeTreino);
      diaDeTreino = diaDeTreino.setDate(diaDeTreino.getDate() + 3);
      diaDeTreino = new Date(diaDeTreino);
      console.log(diaDeTreino);
      diaDeTreino = JSON.stringify(diaDeTreino);
      console.log(diaDeTreino);
      btn.style.display = "none";
      localStorage.setItem("diaDeTreino", diaDeTreino);
      verificar();
    }
  }
  setarData();
  const btn0 = document.getElementById("dia-0-btn");
  const btn1 = document.getElementById("dia-1-btn");
  const btn2 = document.getElementById("dia-2-btn");
  function verificar() {
    if (eHoje()) {
      btn0.style.display = "none";
      btn1.style.display = "none";
      btn2.style.display = "none";
      btn3.style.display = "none";
      setarData();
      console.log("sim");
    } else if (eHoje(2)) {
      console.log("hoje ?? o dia 2");
      btn0.style.display = "none";
      btn1.style.display = "none";
      btn2.style.display = "block";
      btn3.style.display = "none";
      btn.style.display = "none";
    } else if (eHoje(1)) {
      console.log("hoje ?? o dia 1");
      btn0.style.display = "none";
      btn1.style.display = "block";
      btn2.style.display = "none";
      btn3.style.display = "none";
      btn.style.display = "none";

      // btn.style.display = "none";
      // console.log("nao");
    } else if (eHoje(0)) {
      console.log("hoje ?? o dia 0");
      btn0.style.display = "block";
      btn1.style.display = "none";
      btn2.style.display = "none";
      btn3.style.display = "none";
      btn.style.display = "none";
      // btn.style.display = "none";
      // console.log("nao");
    } else {
      btn0.style.display = "none";
      btn1.style.display = "none";
      btn2.style.display = "none";
      btn.style.display = "none";
      setarData(true);
    }
  }
  verificar();

  const translateColor = (weColor) =>
    weColor.split(" ").map((value) => Math.ceil(value * 255));
})(document, window);
