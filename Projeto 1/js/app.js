/**
 * Created by Ramon on 21/12/2016.
 */
var app = new Vue({
    el: '#app',
    data:{
        player: {hp: 100, maxHP: 100},
        monster: {hp: 100},
        gameIsRunning: false,
        actions: []
    },
    methods:{
        startGame: function () {
            this.player.hp = 100;
            this.monster.hp = 100;
            this.actions = [];
            this.gameIsRunning = true;
        },
        playerAction: function(action){

            if(action === 4){
                if(confirm("Are you sure you will run?")){
                    this.gameIsRunning = false;
                    return;
                }
            }

            this.monsterAction();

            switch (action){
                case 1:
                    var damage = this.generateValue(5, 15);
                    this.monster.hp -= damage;
                    this.actions.push("You attacked the monster for "+ damage +" damage");
                    break;
                case 2:
                    var damage = this.generateValue(15, 35);
                    this.monster.hp -= damage;
                    this.actions.push("You cast a spell on the monster and dealed "+ damage+" damage");
                    break;
                case 3:
                    var heal = this.generateValue(5, 15);
                    if(this.player.hp + heal > this.player.maxHP){
                        this.player.hp = this.player.maxHP;
                    }
                    else{
                        this.player.hp += heal;
                    }
                    this.actions.push("You healed yourself for "+ heal+ "hp");
                    break;
                case 4:
                    this.actions.push("You did nothing");
            }

            this.checkWin();
        },

        monsterAction: function () {
            var damage = this.generateValue(5, 15);
            this.player.hp -= damage;
            this.actions.push("The monster attacked you for "+ damage +" damage");
        },

        checkWin: function () {
            if(this.player.hp <= 0) {
                var vm = this;
                vm.gameIsRunning = false;
                setTimeout(function(){
                    if(confirm("You lost! Want to try fighting the monster again?")){
                        vm.startGame();
                    }
                }, 100)

                return true;
            }
            if(this.monster.hp <= 0){
                var vm = this;
                vm.gameIsRunning = false;
                setTimeout(function(){
                    if(confirm("You won! Want to try fighting the monster again?")){
                        vm.startGame();
                    }
                }, 100);

                return true;
            }
        },

        generateValue: function (min, max) {
            var value = parseInt((Math.random() * max) + 1);
            return Math.max(value, min);
        }
    },
    computed:{
        showList: function(){
            if(this.actions.length > 0)
                return true;
            else
                return false;
        },
        playerHP: function(){
            return 'width: ' + this.player.hp + '%';
        },
        monsterHP: function () {
            return 'width: ' + this.monster.hp + '%';
        }
    },
    watch: {

    }
});