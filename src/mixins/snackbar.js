import { mapMutations } from "vuex";

export default {
  data() {
    return {
      snackbar: {
        visibility: false,
        message: '',
        displayTime: 4000,
        type: ''
      }  
    }
  },
  methods: {
    ...mapMutations('app', ['setSnackbarMessage']),
    showSnackbarMessage(message, type, timeOut = 4000) {
      if (type === 'error' || type === 'success' || type === 'info'  || type === 'warning') {
        this.snackbar.type = type;
      }
      this.snackbar.displayTime = timeOut;
      this.snackbar.message = message;
      this.snackbar.visibility = true;
      setTimeout(() => (this.setSnackbarMessage(this.snackbar)), 500)
    },
    closeSnackBar() {
      this.snackbar.visibility = false;
      this.setSnackbarMessage(this.snackbar);
    }
  },
}