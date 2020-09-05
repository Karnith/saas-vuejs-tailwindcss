<template>
  <div class>
    <div class="max-w-screen-xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
      <div class="max-w-3xl mx-auto">
        <h2
          class="text-center text-3xl leading-9 font-extrabold text-primary sm:text-4xl sm:leading-10"
        >{{$t("marketing.faq.title")}}</h2>
        <div class="mt-6 border-t border-gray-500" v-for="(question,idx) in questions" :key="idx">
          <dl>
            <div>
              <dt class="text-lg leading-7 mt-6">
                <button
                  @click="toggle(question)"
                  class="text-left w-full flex justify-between items-start text-gray-400 focus:outline-none focus:text-primary"
                >
                  <span class="font-medium text-primary">{{question.question}}</span>
                  <span class="ml-6 h-7 flex items-center">
                    <svg
                      class="h-6 w-6 transform"
                      :class="isExpanded(question) ? '-rotate-180' : 'rotate-0'"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </button>
              </dt>
              <dd class="mt-2 pr-12" v-if="isExpanded(question)">
                <p class="text-base leading-6 text-gray-500">{{question.answer}}</p>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import BaseComponent from "../../components/shared/BaseComponent.vue";
import SuccessModal from "@/components/shared/modals/SuccessModal.vue";
import ErrorModal from "@/components/shared/modals/ErrorModal.vue";

@Component({
  components: { SuccessModal, ErrorModal },
})
export default class FaqComponent extends BaseComponent {
  questions: any = [
    { question: "Question 1", answer: "Answer 1" },
    { question: "Question 2", answer: "Answer 2" },
    { question: "Question 3", answer: "Answer 3" },
    { question: "Question 4", answer: "Answer 4" },
    { question: "Question 5", answer: "Answer 5" },
    { question: "Question 6", answer: "Answer 6" },
  ];
  expanded: any = [];
  mounted() {
    this.expanded.push(this.questions[0].question);
  }
  toggle(question) {
    if (this.expanded.includes(question.question)) {
      this.expanded = this.expanded.filter(
        (item) => item !== question.question
      );
    } else {
      this.expanded.push(question.question);
    }
  }
  isExpanded(question) {
    return this.expanded.includes(question.question);
  }
}
</script>
