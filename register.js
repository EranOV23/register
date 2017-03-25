var $colaButton = document.querySelector("#cola");
var $milkButton = document.querySelector("#milk");
var $gumButton = document.querySelector("#gum");
var $peasButton = document.querySelector("#peas");
var $breadButton = document.querySelector("#bread");

var $cartList = document.querySelector("#cart-list")
var $total = document.querySelector("#register-total");
var $cashInput = document.querySelector("#cash-input");
var $payButton = document.querySelector("#pay")

function Cola(){
	this.sku = 1;
	this.name = "Cola";
	this.price = 10;
	this.discount =.5;
	this.img = "img/cola.png";
}

function Milk(){
	this.sku = 2;	
	this.name = "Milk";	
	this.price = 5;
	this.img = "img/milk.png";
}

function Gum(){
	this.sku = 3;
	this.name = "Gum";
	this.price = 1;
	this.img = "img/gum.png";
}

function Peas(){
	this.sku = 4;
	this.name = "Peas";
	this.price = 9;
	this.img = "img/peas.png";
}

function Bread(){
	this.sku = 5;
	this.name = "Bread"; 
	this.price = 8;
	this.img = "img/bread.png";
}

function Register(){
	
	this.products = [];
	
	this.addProduct = function(product){
		if(product.price == undefined){
			throw new Error("You can't add product with no price")
		}
		else{
			this.products.push(product);
			console.log("You Added " + product.name);
			this.printCart();
			$total.innerHTML = "TOTAL: " + this.getTotal();
		}
	};

	this.printCart = function(){
		while($cartList.hasChildNodes()){
			$cartList.removeChild($cartList.lastChild);
		}

		for(product of this.products){
			var $li = document.createElement("li");
			$li.innerHTML = "<img src="+ product.img+ ">"+
							product.name + ": " + product.price;
			
			if(product.discount){
				$li.innerHTML = "<img src="+ product.img+ ">"
								+ product.name + ": " + product.price +
								"/ " + product.discount;
			}
			$cartList.appendChild($li);
			this.createRemove(product);
		}
	}

	this.createRemove = function(product){
		var $removeButton = document.createElement("button");
		$removeButton.innerHTML = "Remove";
		$removeButton.addEventListener("click", function(){
			register.remove(product);
		});
		$cartList.appendChild($removeButton); 

	}

	this.remove = function(product){
		var key = this.products.indexOf(product);
		console.log(key);
		this.products.splice(key, 1);
		this.printCart();
		$total.innerHTML = this.getTotal();
	
	}

	this.getTotal = function(){
		
		var total = 0;

		for(product of this.products){

			if(product.discount){
				total += product.price * (1-product.discount);				
			}
			else{
				total += product.price;
			};

		}

		return total;
	}

	this.pay = function(amount){
		if(amount >= this.getTotal()){
			var change = amount - this.getTotal();
			console.log("Thanks, Here is your change: " + change);
			alert("Thanks, Here is your change: " + change);
			this.products = [];
			$total.innerHTML = this.getTotal();
			this.printCart();
			$cashInput.value = change;
		}
		else{
			var raise = this.getTotal() - amount;
			console.log("That's not enough, Pleas add " + raise + " NIS more");
			alert("That's not enough, Pleas add " + raise + " NIS more");

		}
	}

}


var register = new Register();


// $colaButton.onclick = register.addProduct(new Cola());
$colaButton.addEventListener("click", function(){
  register.addProduct(new Cola())
})

$milkButton.addEventListener("click", function(){
  register.addProduct(new Milk())
})

$gumButton.addEventListener("click", function(){
  register.addProduct(new Gum())
})

$peasButton.addEventListener("click", function(){
  register.addProduct(new Peas())
})

$breadButton.addEventListener("click", function(){
  register.addProduct(new Bread())
})

$payButton.addEventListener("click", function(){
  register.pay($cashInput.value);
})