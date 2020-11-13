class Complex{
    constructor(re, im){
        this.re = re;
        this.im = im;
    }
    getMagnitude(){
        return Math.sqrt(this.re * this.re + this.im * this.im);
    }
    getPhase(){
        return Math.atan2(this.im, this.re);
    }
    mult(c){
        let re = this.re * c.re - this.im * c.im;
        let im = this.im * c.re + this.re * c.im;
        return new Complex(re,  im);
    }
    add(c){
        let re = this.re + c.re;
        let im = this.im + c.im;
        return new Complex(re,  im);
    }
}