document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav");
  const scrollButtons = document.querySelectorAll("[data-scroll]");
  const orderForm = document.getElementById("orderForm");
  const successEl = document.getElementById("formSuccess");

  if (burger && nav) {
    burger.addEventListener("click", () => {
      burger.classList.toggle("burger--active");
      nav.classList.toggle("nav--open");
    });

    nav.addEventListener("click", (event) => {
      const link = event.target.closest("a");
      if (link) {
        burger.classList.remove("burger--active");
        nav.classList.remove("nav--open");
      }
    });
  }

  scrollButtons.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      const targetSelector = btn.getAttribute("data-scroll");
      if (!targetSelector) return;
      const target = document.querySelector(targetSelector);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  if (orderForm && successEl) {
    const fieldErrors = {
      name: "Пожалуйста, укажите ваше имя.",
      phone: "Введите номер телефона для связи.",
      date: "Укажите дату праздника.",
      details: "Опишите, какой торт вы хотите.",
      policy: "Нужно согласиться с обработкой персональных данных."
    };

    orderForm.addEventListener("submit", (event) => {
      event.preventDefault();

      successEl.textContent = "";

      const formData = new FormData(orderForm);
      let isValid = true;

      Object.keys(fieldErrors).forEach((name) => {
        const errorEl = orderForm.querySelector(`[data-error-for="${name}"]`);
        if (!errorEl) return;
        errorEl.textContent = "";

        if (name === "policy") {
          const checked = orderForm.elements[name].checked;
          if (!checked) {
            errorEl.textContent = fieldErrors[name];
            isValid = false;
          }
        } else {
          const value = (formData.get(name) || "").toString().trim();
          if (!value) {
            errorEl.textContent = fieldErrors[name];
            isValid = false;
          }
        }
      });

      if (!isValid) {
        const firstErrorField = orderForm.querySelector(".form__error:not(:empty)");
        if (firstErrorField) {
          const input =
            firstErrorField.closest(".form__field")?.querySelector("input, textarea, select");
          if (input) {
            input.focus();
          }
        }
        return;
      }

      orderForm.reset();
      successEl.textContent =
        "Спасибо! Я получила вашу заявку и свяжусь с вами в ближайшее время, чтобы обсудить детали торта.";
    });
  }
});

