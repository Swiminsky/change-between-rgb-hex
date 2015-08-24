var cgModel = Regular.extend({
	template:
		"<input r-model={color.o} on-blur={this.show(color.o)} placeholder='任君享用'/>"+
		"<h1>{color.n}</h1>",
	show: function(v) {
		var  r = '',
			_k = /#/.test(v),
			_u = v.split(",");
		//hex2rgb
		if ( _k && v.length == 4 ) {
			for (var i = 1; i<4; i++) {
				r += parseInt(v.charAt(i).concat(v.charAt(i)),16) + ",";
			}
			r = r.slice(0,-1);
		}
		//hex2rgb
		else if ( _k && v.length == 7 ) {
			for (var i = 1; i<7; i+=2) {
				r += parseInt(v.substr(i,2),16) + ",";
			}
			r = r.slice(0,-1);
		}
		//rgb2hex
		else if ( !_k && _u.length == 3 ) {
			for (var i = 0; i<3; i++) {
				var n = new Number(_u[i]);
				r += n>=0&&n<16?"0"+n.toString(16):n.toString(16);
			}
			r = "#"+r;
		}
		//input error
		else {
			r = "格式错误，请重新输入";
		}
		this.data.color.n = r;
	}
})

var cg = new cgModel({
	data:{
		color:{
			o:"",
			n:""
		},
	}
})

cg.$inject("#app");