/**
 * Created by Ramon on 21/12/2016.
 */
var app = new Vue({
    el: '#app',
    data:{
        player: {hp: 100, maxHP: 100,
            normalAttack: function () {
                var damage = parseInt((Math.random() * 15) + 1);
                if(damage <= 5){
                    return 5;
                }
                return damage;
            },
            specialAttack: function(){
                var damage = parseInt((Math.random() * 35) + 1);
                if(damage <= 15){
                    return 15;
                }
                return damage;
            },
            heal: function () {
                var heal = parseInt((Math.random() * 15) + 1);
                if(heal <= 5){
                    return 5;
                }
                return heal;
            }
        },
        monster: {hp: 100,
            normalAttack: function () {
                var damage = parseInt((Math.random() * 15) + 1);
                if(damage <= 5){
                    return 5;
                }
                return damage;
            }},
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

            var damage = this.monster.normalAttack()
            this.player.hp -= damage;
            this.actions.push("The monster attacked you for "+ damage +" damage");

            switch (action){
                case 1:
                    var damage = this.player.normalAttack()
                    this.monster.hp -= damage;
                    this.actions.push("You attacked the monster for "+ damage +" damage");
                    break;
                case 2:
                    var damage = this.player.specialAttack();
                    this.monster.hp -= damage;
                    this.actions.push("You cast a spell on the monster and dealed "+ damage+" damage");
                    break;
                case 3:
                    var heal = this.player.heal();
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

            if(this.player.hp <= 0) {
                var vm = this;
                vm.gameIsRunning = false;
                setTimeout(function(){
                    if(confirm("You lost! Want to try fighting the monster again?")){
                        vm.startGame();
                    }
                }, 100)

                return;
            }
            if(this.monster.hp <= 0){
                var vm = this;
                vm.gameIsRunning = false;
                setTimeout(function(){
                    if(confirm("You won! Want to try fighting the monster again?")){
                        vm.startGame();
                    }
                }, 100);

                return;
            }
        },

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