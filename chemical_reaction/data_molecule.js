const molecule_text = `AgCl	143.5
AgNO3	170
Al	27
Al2(SO4)3	342
Al2O3	102
Ba(OH)2	171
BaCl2	208
BaSO4	233
C	12
C2H2	26
C2H4	28
C2H5OH	46
C2H6	30
C3H8	44
C4H10	58
Ca(OH)2	74
CaCl2	111
CaCO3	100
CH3OH	32
CH4	16
CO	28
CO2	44
Cu	64
Cu[1]	64
Cu[2]	64
Cu(NO3)2	188
Cu2O	144
CuO	80
CuSO4	160
Fe	56
Fe2O3	160
FeS	88
FeS2	120
H2	2
H2O	18
H2O2	34
H2S	34
H2SO4	98
HCl	36.5
HNO2	47
HNO3	63
Mg	24
MgCl2	95
MgO	40
N2	28
Na2CO3	106
Na2SO4	142
NaCl	58.5
NaHCO3	84
NaNO3	85
NaOH	40
NH3	17
NH4Cl	53.5
NO	30
NO2	46
O2	32
O3	48
S	32
SO2	64
Zn	65
ZnCl2	136
ZnSO4	161
SO3	80
ZnO	81
Mg3N2	100
AlN	41
CaO	56
BaO	153
(NH4)2SO4	168
BaSO4	217
AlCl3	133.5
FeCl2	127
Fe3O4	672
FeO	72
H2CO3	62
H2SO3	82
CS2	76
MgSO4	120`;

const data_molecule = {};

molecule_text.split('\n').forEach(e => {
    let alt = e.split('\t');
    data_molecule[alt[0]] = Number(alt[1]);
});