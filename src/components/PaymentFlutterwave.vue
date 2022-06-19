<template>
  <div class="footer">
    <h2>Join our Team of Writers</h2>
    <h5>On dasdas, writers earn a living doing what they love.</h5>
    <h5>
      Getting started is easy. Just pay a one time $25 fee and everything is
      ready to go.
    </h5>
    <button v-on:click="payViaService">Join Us</button>
  </div>
</template>

<script>
export default {
  name: "PaymentFlutterWave",
  data() {
    return {
      paymentData: {
        tx_ref: this.generateReference(),
        amount: 25,
        currency: "USD",
        payment_options: "card",
        redirect_url: "/",
        meta: {
          counsumer_id: "7898",
          consumer_mac: "kjs9s8ss7dd",
        },
        customer: {
          name: "Demo Customer  Name",
          email: "customer@mail.com",
          phone_number: "081845***044",
        },
        customizations: {
          title: "dasdas",
          description: "Customization Description",
          logo: "",
        },
        callback: this.makePaymentCallback,
        onclose: this.closedPaymentModal,
      },
    };
  },
  methods: {
    payViaService() {
      this.$launchFlutterwave(this.paymentData);
    },
    makePaymentCallback(response) {
      if (response && response.status == "successful") {
        setTimeout(() => {
          alert("mi amor");
          (document.location.href = "/"), true;
        }, 10000);
      }
    },
    closedPaymentModal() {
      console.log("payment is closed");
    },
    generateReference() {
      let date = new Date();
      return date.getTime().toString();
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/scss";
.footer {
  @include container;
  padding-top: 3rem;
  padding-bottom: 10rem;
  text-align: center;
  h2 {
    font-size: 32px;
    line-height: 38px;
    font-weight: 500;
    margin-bottom: 20px;
  }
  h5 {
    font-size: 22px;
    font-weight: 400;
    color: #6e6e6e;
    line-height: 32px;
  }

  button {
    padding: 10px 50px;
    font-size: 18px;
    font-weight: 500;
    background-color: #000;
    color: white;
    border: none;
    margin-top: 30px;
    cursor: pointer;
  }
}
</style>
