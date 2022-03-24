//llamada al contrato del sistema

const Evaluaciones=artifacts.require("Evaluaciones");

contract ("Evaluaciones",accounts=>{
   /*  it('function Evaluar siendo alumno',async () => {
        let instance=await Evaluaciones.deployed();
        const nota=await instance.evaluar("77755N",5,{from:accounts[1]})
    }); */
   /*  it('function Evaluar siendo profe',async () => {
        let instance=await Evaluaciones.deployed();
        const nota=await instance.evaluar("77755N",5,{from:accounts[0]})
    }); 
    it('function consultarNota',async () => {
        let instance=await Evaluaciones.deployed();
        const consultar= await instance.consultarnota.call("77755N",{from:accounts[1]})
        assert.equal(consultar,5);
        console.log(consultar)
    });

    it ("solicitarRevision(string)",async()=>{
        let instance =await Evaluaciones.deployed();
        const revision=await instance.solicitarRevision("77755N",{from:accounts[1]});
    })

    it ("revision fallida",async ()=> {
        let instance=await Evaluaciones.deployed();
        const revision=await instance.solicitarRevision.call("zzzz",{from:accounts[3]});
    }) */
    /* it ("revision fallida por profesor",async ()=> {
        let instance=await Evaluaciones.deployed();
        const revision=await instance.solicitarRevision.call("zzzz",{from:accounts[0]});
    })

    it ("Ver pedidos revision",async ()=> {
        let instance=await Evaluaciones.deployed();
        const revision=await instance.solicitarRevision("77755N",{from:accounts[1]});
        const ver=instance.pedidosRevision.call({from:accounts[0]});
         assert.equal(ver[0],'77755N')
        console.log(ver)
    }) */ 


    it ("Evaluar matematicas y biologia",async ()=>{
        let instance=await Evaluaciones.deployed();
        const evaluar1=await instance.evaluar("matematicas","77755N",3)
        const evaluar2=await instance.evaluar("biologia","77755N",9)
        const vernota1=await instance.consultarnota("matematicas","77755N",{from:accounts[1]})
        const vernota2=await instance.consultarnota("biologia","77755N",{from:accounts[1]})
        assert.equal(vernota1,3)
        assert.equal(vernota2,9)

    })


    it ("Funcion:revision(string asignatura,string id", async ()=>{
        let instance=await Evaluaciones.deployed();
        const rev1=await instance.solicitarRevision("matematicas","77755N",{from:accounts[1]})
        const verRevision=await instance.pedidosRevision("matematicas",{from:accounts[0]})
        assert.equal(verRevision,"77755N");
    })


})