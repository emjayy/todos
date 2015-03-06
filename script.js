function mainCtrl($scope){
    $scope.todos = [];

    if(localStorage.todos){ // if there is todos in the localstorage
        $scope.todos = JSON.parse(localStorage.todos); // use them
    }

    $scope.add = function(){
        if(!$scope.newTodo) return; // die if the newTodo is blank

        // add a new todo into the list
        $scope.todos.push({content: $scope.newTodo, done: false});
        $scope.newTodo = ''; // clear the input (data-binding)

        $scope.store(); // store the list in localstorage
    }

    $scope.clear = function(){
        // Keep todos that are not done. Delete the rest.
        $scope.todos = $scope.todos.filter(function(el){
            return !el.done;
        });

        $scope.store(); // store the list in localstorage
    }

    $scope.store = function(){
        // Remove all the $$hashKey properties from the todos, which
        // causes problems when we load todos from localstorage
        var todos = $scope.todos.map(function(el){
            delete el.$$hashKey;
            return el;
        });

        // put the todos into localstorage
        localStorage.todos = JSON.stringify(todos);
    }
}