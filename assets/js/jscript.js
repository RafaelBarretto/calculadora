// JavaScript Document
fim = null;

$(document).ready(function(){
	function soma(num1, num2){
		res = (num1)+(num2);
		return res;
	}
	
	function subtracao(num1, num2){
		res=0;
		if (num1 > num2){
			while ( num2 < num1){
				num2++;
				res++;
			}
		}else{
			while ( num1 < num2){
				num1++;
				res++;
			}
			res= Number('-'+res);
		}
		return res;
	}
	
	function multiplicacao(num1, num2){
		var negativo = false;
		var res = 0;
		
		if ((num1 < 0) && (num2 < 0)){
			negativo = false;
		}else{
			if (num2 < 0){
				negativo = true;
				num2 = Number($(num2).text().substring(1));
			}else if(num1 < 0){
				negativo = true;
				num1 = Number($(num1).text().substring(1));
			}
		}
		
		for (i=0; i< num2; i++){
			res = soma(res,num1);
		}
		
		if ((negativo) && (res != 0)){
			res = Number('-'+res);
		}
		
		return res;
	}
	
	function divisao(num1, num2){
		var res = 0;
		var con = 0;
		var negativo = false;
		res = 0;
		
		if ((num1 < 0) && (num2 < 0)){
			negativo = false;
		}else{
			if (num2 < 0){
				negativo = true;
				num2 = Number($(num2).text().substring(1));
			}else if(num1 < 0){
				negativo = true;
				num1 = Number($(num1).text().substring(1));
			}
		}
		
		while(con < num1){
			con = con + num2;
			if ((con < num1) || (con == num1)){
				res++;
			}
		}
		
		if (negativo){
			res = "-" + res;
		}
		
		return res;
	}
	
	function potencializao(num1){
		var res = 0;
		for (i=0; i<num1; i++){
			res = soma(res,(i+i+1));
		}
		return res;
	}
	
	function racionalcizao(num1){
		var res = num1;
		var con = 0;
		for (i=0; i<num1; i++){
			res = subtracao(res,(i+i+1));
			if ((res > 0) || (res == 0)){
				con++;
			}
		}
		return con;
	}
	
	
	function operacao(op, num1, num2){
		num2 = num2 || 0;
		var res = 0;
		
		switch(op){
			case "sinalSoma":
				res = soma(num1, num2);
				break;
			case "sinalSub":
				res = subtracao(num1, num2);
				break;
			case "sinalMult":
				res = multiplicacao(num1, num2);
				break;
			case "sinalDiv":
				res = divisao(num1, num2);
				break;
			case "sinalPotencia":
				res = potencializao(num1);
				break;
			case "sinalRaiz":
				res = racionalcizao(num1);
				break;
			default:
				res = 0;
				break;
		}
		fim=true;
		return res;
	}

	function fimOperacao(){
		$('.telaEq').html('<span id="Sinal1"></span><span id="Num1"></span><span id="Sinal2"></span><span id="Num2"></span>');
		$('#Num1').html($('.telaNum').text());
		$('.telaNum').html('0');
		fim = false;
	}
	
	$('.tecladoNum').click(function(e) {
		var btnNum = Number($(e.target).text());
		var sinal = $('#Sinal1').get(0).className;
		if (fim){
			fimOperacao();
		}
		
		if ($('.telaNum').text() != '0'){  
				$('.telaNum').append(btnNum);
			}else{ 
				$('.telaNum').html(btnNum);
			}
	});
	
	$('.tecladoSinaisSup').click(function(e){
		e.preventDefault();
		var sinal = $('#Sinal2').get(0).className;

		if ((fim == true)){
			fimOperacao();
		}
		
		if ((sinal == null) || (sinal == '')){
			$('#Sinal2').addClass(e.target.id);
			$('#Num1').html(Number($('.telaNum').text()));
			$('#Sinal2').html($(e.target).text());
			$('.telaNum').html(0);
		}
	});

	$('#sinalPotencia').click(function(e) {
		e.preventDefault();
		var num1 = 0;
		$('#Sinal1').addClass(e.target.id);
		num1 = Number($('.telaNum').text());
		resultado = potencializao(num1);

		$('#Sinal1').html($(e.target).text());
		$('#Num1').html(num1);
		$('.telaNum').html(resultado);
		fim=true;
	});
	
	$('#sinalRaiz').click(function(e) {
		e.preventDefault();
		var num1 = 0;
		$('#Sinal1').addClass(e.target.id);
		num1 = Number($('.telaNum').text());
		resultado = racionalcizao(num1);
		
		$('#Sinal1').html($(e.target).text());
		$('#Num1').html(num1);
		$('.telaNum').html(resultado);
		fim=true;
	});
	
	$('#sinalIgual').click(function(e) {
		e.preventDefault();
		if (fim){
			fimOperacao();
			$('#Num1').html('');
			$('.telaNum').html(0);
		}else{
			var num1 = Number($('#Num1').text());
			var num2 = Number($('.telaNum').text());
			$('#Num2').html(num2);
			var sinal = $('#Sinal2').get(0).className;
			var resultado = operacao(sinal, num1, num2);
			$('.telaNum').html(resultado);
		}
	});
	
	$('#btInv').click(function(e){
		e.preventDefault();
		var valor = Number($('.telaNum').text());
		if (valor != 0){
			if(valor < 0){
				$('.telaNum').html($('.telaNum').text().substring(1));
			}else{
				$('.telaNum').html(Number('-'+valor));
			}
		}else{
			$('.telaNum').html('0');
		}
	});
	
	$('#btCE').click(function(e){
		e.preventDefault();
		$('.telaEq').html('<span id="Sinal1"></span><span id="Num1"></span><span id="Sinal2"></span><span id="Num2"></span>');
		$('.telaNum').html('0');
	});
});
