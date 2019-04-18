(() => {

    'use strict';

    const config = {
        apiKey: "AIzaSyBOmtmjY3TT6epJigzw3bnh3Tpljq6_BD8",
        authDomain: "fir-todo-f8400.firebaseapp.com",
        databaseURL: "https://fir-todo-f8400.firebaseio.com",
        projectId: "fir-todo-f8400",
        storageBucket: "",
        messagingSenderId: "404570195610"
    };

    var vm = new Vue({
        el: '#app',
        data: {
            newItem: null,
            todos: [],
        },
        watch: {
            todos: {
                handler: function () {
                    localStorage.setItem('todos', JSON.stringify(this.todos));
                },
                deep: true
            },
        },
        mounted: function() {
            this.todos = JSON.parse(localStorage.getItem('todos'));
        },
        methods: {
            addItem: function () {
                let item = {
                    title: this.newItem,
                    status: false
                }
                this.todos.push(item);
                this.newItem = '';
            },
            deleteItem: function (index) {
                if (confirm('Are you sure?')) {
                    this.todos.splice(index, 1);
                }
            },
            purge: function () {
                if (!confirm('delete finished?')) {
                    return;
                }
                this.todos = this.remaining;
            }
        },
        computed: {
            remaining: function () {
                return this.todos.filter(function (todo) {
                    return !todo.status;
                });
            }
        }
    });

    firebase.initializeApp(config);

    const db = firebase.firestore();

    db.settings({
        timestampsInSnapshots: true
    });


})();
