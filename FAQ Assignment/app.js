const { createApp } = Vue

  createApp({
    data() {
      return {
        message: 'Hello Vue!',
        list_items: [
            {
                id: 1,
                question: "What is this?",
                answer: "This is a program to select best footballers in the world!",
                toggle: false,
            }
        ],
        question: "",
        answer: "",
        questionError: "",
        answerError: "",
        faqButtonPressed: 1,
        currentId: "",
      }
    },
    mounted() {
        this.faqModal = new bootstrap.Modal(document.getElementById('faqModal'), {
            backdrop: true,
            keyboard: true,
        });

        this.deleteFAQModal = new bootstrap.Modal(document.getElementById('faqDeleteModal'), {
            backdrop: true,
            keyboard: true,
        });

        // Check if Local Storage has faq_items array. If not add empty arr!
        let faq_items = localStorage.getItem("faq_items");
        if (!faq_items) {
            localStorage.setItem("faq_items", JSON.stringify([]));
            this.list_items = [];
        } else {
            this.list_items = JSON.parse(faq_items);
        }
        
    },
    methods: {
        openModal(item) {
            this.question = item ? item.question : "";
            this.answer = item ? item.answer: "";
            this.faqButtonPressed = item ? 2 : 1;
            this.currentId = item ? item.id : "";

            this.faqModal.show();
        },
        closeModal() {
            this.faqModal.hide();
        },
        submitFAQ() {
            if (!this.question || !this.answer) {
                this.questionError = "This field is required";
                this.answerError = "This field is required";

                return;
            }

            // Put value in Local Storage Array.
            let result = localStorage.getItem("faq_items");
            result = JSON.parse(result);
            let faq_items;

            if (!result.length) {
                faq_items = [];
            } else {
                faq_items = result;
            }

            faq_items.push({
                id: Math.floor(Math.random() * 100),
                question: this.question,
                answer: this.answer,
                toggle: false,
            });

            this.list_items.push({
                id: Math.floor(Math.random() * 100),
                question: this.question,
                answer: this.answer,
                toggle: false,
            });

            localStorage.setItem("faq_items", JSON.stringify(faq_items));
            this.faqModal.hide();
        },
        editFAQ() {
            let index = this.list_items.findIndex(el => {
                return el.id = this.currentId;
            });

            this.list_items.splice(index, 1, { id: this.currentId, question: this.question, answer: this.answer, toggle: false });

            localStorage.setItem("faq_items", JSON.stringify(this.list_items));
            this.faqModal.hide();
        },
        openDeleteModal(item) {
            this.currentId = item.id;
            this.deleteFAQModal.show();

        },
        deleteFAQ() {
            let index = this.list_items.findIndex(el => {
                return el.id = this.currentId;
            });

            this.list_items.splice(index, 1);

            localStorage.setItem("faq_items", JSON.stringify(this.list_items));
            this.deleteFAQModal.hide();
        }
    }
  }).mount("#app");