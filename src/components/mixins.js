import * as firebase from 'firebase';

module.exports= {
    methods: {
        getExpenses2() {
            console.log('IN THE MIXIN')
                
          const that = this;
          const ref = firebase.database().ref('users/'+ this.user.uid).child('/expenses2/')
          
          var expenses = [];
          var amounts = [];
          
          ref.once('value')
          .then(function(snapshot) {
              snapshot.forEach(function(expense) {
                  expenses.push( expense.val() );
              });
              that.setExpenses2(expenses);
          });
        },
        testing() {
            console.log('testing');
        }
    }
}