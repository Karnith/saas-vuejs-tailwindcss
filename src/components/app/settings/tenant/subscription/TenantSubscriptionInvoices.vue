<template>
  <div>
    <div class="shadow sm:rounded-md">
      <div class="px-4 py-5 bg-white sm:p-6">
        <div class="grid grid-cols-6 gap-6">
          <div class="col-span-6 text-sm text-gray-800">
            <span class="block text-sm leading-5 font-medium text-gray-700 mb-1">
              {{ $t("settings.tenant.invoices.title") }}
              <div class="text-right block text-sm leading-5 font-medium text-theme-500 -mt-4 mb-1">
                <span v-if="upcomingInvoice && upcomingInvoice.amount_due" id="listbox-label">
                  {{ $t("settings.tenant.subscription.upcomingInvoice") }}:
                  {{ invoiceDescription(upcomingInvoice) }}
                </span>

                <span v-else>{{ $t("settings.tenant.subscription.noUpcomingInvoices") }}</span>
              </div>
            </span>
          </div>
          <div class="col-span-6 text-sm text-gray-800">
            <div
              v-if="
                $store.state.tenant.stripeInvoices &&
                  $store.state.tenant.stripeInvoices.data
              "
            >
              <div
                class="p-0 mb-3 border-b-2 border-indigo-100"
                v-for="(invoice, index) in $store.state.tenant.stripeInvoices
                  .data"
                :key="index"
              >
                <a
                  :href="invoice.invoice_pdf"
                  target="_blank"
                  type="button"
                  class="mb-2 mr-2 inline-flex items-center px-2.5 py-1.5 border text-xs leading-4 font-medium rounded text-theme-700 bg-blue-100 border-blue-100 p-1 hover:bg-blue-200 focus:outline-none focus:border-indigo-300 focus:shadow-outline-indigo active:bg-indigo-200 transition ease-in-out duration-150"
                >Download</a>
                <span>
                  {{ invoice.lines.data[0].description }}
                  {{ invoice.lines.data[0].plan ?
                  $t(
                  "marketing.pricing." + invoice.lines.data[0].plan.interval
                  ) : ""
                  }}
                  {{ invoiceDescription(invoice) }}
                </span>
              </div>
            </div>
            <div v-else>{{ $t("settings.tenant.subscription.noInvoicesYet") }}</div>
          </div>
        </div>
      </div>
    </div>

    <success-modal ref="success-modal"></success-modal>
    <error-modal ref="error-modal"></error-modal>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import BaseComponent from "../../../../../components/shared/BaseComponent.vue";

import ErrorModal from "@/components/shared/modals/ErrorModal.vue";
import SuccessModal from "@/components/shared/modals/SuccessModal.vue";
import Stripe from "stripe";
@Component({
  components: { ErrorModal, SuccessModal },
})
export default class TenantSubscriptionInvoices extends BaseComponent {
  upcomingInvoice = {} as Stripe.Invoice;
  created() {
    const self = this;
    this.eventBus.$on("updated-plan", () => self.getUpcomingInvoice());
  }
  beforeDestroy() {
    this.eventBus.$off("updatedPlan");
  }
  mounted() {
    this.getUpcomingInvoice();
  }
  getUpcomingInvoice() {
    const self = this;
    this.services.stripe.getUpcomingInvoice().then((response: any) => {
      self.upcomingInvoice = response.data;
    });
  }
  invoiceDescription(invoice) {
    if (invoice && invoice.created) {
      const created = new Date(invoice.created * 1000);
      const createdString = this.$d(created, "short", this.$i18n.locale);

      return " $" + invoice.amount_due / 100 + " - " + createdString;
    }
    return "";
  }
}
</script>
