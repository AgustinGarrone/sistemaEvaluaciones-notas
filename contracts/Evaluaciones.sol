// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;
pragma experimental ABIEncoderV2;

// -----------------------------------
//  ALUMNO   |    ID    |      NOTA
// -----------------------------------
//  Marcos |    77755N    |      5
//  Joan   |    12345X    |      9
//  Maria  |    02468T    |      2
//  Marta  |    13579U    |      3
//  Alba   |    98765Z    |      5

contract Evaluaciones {
    //Direccion del profesor
    address public profesor;

    constructor() {
        profesor=msg.sender;
    }
    //mapeamos el hash del alumno a la nota
    mapping(bytes32=>uint) nota;
    //string de alumnos a revisar
    mapping (string =>string []) revisiones;

    event alumnoEvaluado(bytes32);
    event alumnoRevision(string);

    modifier soloProfesor(address _ad) {
        require (profesor==_ad,"no sos el profesor");
        _;
    }

    modifier soloAlumno (address _direccion) {
        require (_direccion!=profesor, "No sos un alumno");
        _;
    }

    

    function evaluar(string memory _asignatura,string memory _id, uint _nota) public soloProfesor(msg.sender) {
        bytes32 hashAlumno=keccak256(abi.encodePacked(_asignatura,_id));
        nota[hashAlumno]=_nota;
        for (uint i=0;i<revisiones[_asignatura].length;i++) {
            if (keccak256(abi.encodePacked(_id))==keccak256(abi.encodePacked(revisiones[_asignatura][i]))) {
                delete revisiones[_asignatura][i];
            }
        }
        emit alumnoEvaluado(hashAlumno);
    }
    
    function consultarnota(string memory _asignatura,string memory _id) public view returns(uint){
        bytes32 hashAlumno=keccak256(abi.encodePacked(_asignatura,_id));
        return nota[hashAlumno];
    }

    function solicitarRevision(string memory _asignatura,string memory _id) public soloAlumno(msg.sender){
        bytes32 hashAlumno=keccak256(abi.encodePacked(_asignatura,_id));
        require (nota[hashAlumno]>0,"No estas corregido, por lo que no podes solicitar revision");
        revisiones[_asignatura].push(_id);
        emit alumnoRevision(_id);
    }

    function pedidosRevision (string memory _asignatura) public view soloProfesor(msg.sender) returns (string[] memory) {
        return revisiones[_asignatura];
     }
}