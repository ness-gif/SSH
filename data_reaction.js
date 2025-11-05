const reaction_text = `Cu	1	HNO3	4		Cu(NO3)2	1	NO2	2	H2O	2		加熱
Cu	1	H2SO4	2		CuSO4	1	SO2	1	H2O	2		加熱
Cu[1]	4	O2	2		Cu2O	2						加熱
Cu[2]	2	O2	1		CuO	2						加熱
CuO	1	H2	1		Cu	1	H2O	1				加熱
Fe	1	S	1		FeS	1						加熱
FeS2	4	O2	11		Fe2O3	2	SO2	8				加熱
H2S	2	SO2	1		S	3	H2O	2				加熱
NaHCO3	2				CO2	1	H2O	1	Na2CO3	1		加熱
NH3	4	O2	3		N2	2	H2O	6				加熱
NH4Cl	2	Ca(OH)2	1		CaCl2	1	NH3	2	H2O	2		加熱
SO2	2	O2	1		SO3	2						加熱
Fe	4	O2	3		Fe2O3	2						加熱
Al	2	N2	1		AlN	2						加熱
AgNO3	2				Ag	2	NO2	2	O2	1		加熱
FeS2	1	O2	7		FeS	3	SO2	4				加熱
FeS2	1				FeS	1	S	1				加熱
NH4Cl	2				NH3	2	HCl	2				加熱
Ca(OH)2	1				CaO	1	H2O	1				加熱
Ba(OH)2	1				BaO	1	H2O	1				加熱
Fe	3	CuO	2		Fe3O4	1	Cu	2				加熱
Fe	1	CuO	1		FeO	1	Cu	1				加熱２
C	1	S	2		CS2	1						加熱
NH4Cl	1	BaOH2	1		NH3	2	BaCl2	1	H2O	2		加熱
NH3	4	O2	5		NO	4	H2O	6				加熱（触媒）
Al	2	H2SO4	6		Al2(SO4)3	1	SO2	3	H2O	6		加熱(濃)
Ba(OH)2	1	H2SO4	1		BaSO4	1	H2O	2				混合
CaCO3	1	HCl	2		CaCl2	1	H2O	1	CO2	1		混合
Mg	1	HCl	2		MgCl2	1	H2	1				混合
Na2SO4	1	BaCl2	1		NaCl	2	BaSO4	1				混合
NaCl	1	AgNO3	1		NaNO3	1	AgCl	1				混合
NaOH	1	HCl	1		NaCl	1	H2O	1				混合
NO	2	O2	1		NO2	2						混合
NO2	2	H2O	1		HNO3	1	HNO2	1				混合
Zn	1	HCl	2		ZnCl2	1	H2	1				混合
Zn	1	H2SO4	1		ZnSO4	1	H2	1				混合
Ca(OH)2	1	HCl	2		CaCl2	1	H2O	2				混合
Ba(OH)2	1	HCl	2		BaCl2	1	H2O	2				混合
NaHCO3	1	HCl	1		NaCl	1	CO2	1	H2O	1		混合
NH3	1	HCl	1		NH4Cl	1						混合
NH3	2	H2SO4	1		(NH4)2SO4	2						混合
Ca(OH)2	1	CO2	1		CaCO3	1	H2O	1				混合
Ba(OH)2	1	SO2	1		BaSO3	1	H2O	1				混合
Al	2	HCl	6		AlCl3	2	H2	3				混合
Fe	1	HCl	2		FeCl2	1	H2	1				混合
Cu	1	AgNO3	2		Cu(NO3)2	1	Ag	2				混合
CO2	1	H2O	1		H2CO3	1						混合
SO2	1	H2O	1		H2SO3	1						混合
H2S	1	H2O2	1		S	1	H2O	2				混合
NH4Cl	1	NaOH	1		NH3	1	CaCl2	1	H2O	2		混合
H2SO4	1	NaHCO3	2		Na2SO4	1	CO2	2	H2O	2		混合
H2SO4	1	Fe	1		FeSO4	1	H2	1				混合
H2SO4	1	Mg	1		MgSO4	1	H2	1				混合
H2SO4	1	NaOH	2		Na2SO4	1	H2O	2				混合
CO2	1	NaOH	2		Na2CO3	1	H2O	1				混合
CO2	1	Ca(OH)2	1		CaCO3	1	H2O	1				混合
Al	2	H2SO4	3		Al2(SO4)3	1	H2	3				混合(希)
H2O2	2	(MnO2)			H2O	2	O2	1				触媒
H2O	2				H2	2	O2	1				電気分解
N2	1	H2	3		NH3	2						特殊
O2	3				O3	2						特殊
C	3	H2O	2		CO2	1	CO	2	H2	2		特殊
NH3	2				N2	1	H2	3				特殊
CuO	2				Cu	2	O2	1				特殊
CO	1	H2O	1		CO2	1	H2	1				特殊
CO2	1	H2	1		CO	1	H2O	1				特殊
Al	4	O2	3		Al2O3	2						燃焼
C	1	O2	1		CO2	1						燃焼
C2H2	2	O2	5		CO2	4	H2O	2				燃焼
C2H4	1	O2	3		CO2	2	H2O	2				燃焼
C2H5OH	1	O2	3		CO2	2	H2O	3				燃焼
C2H6	2	O2	7		CO2	4	H2O	6				燃焼
C3H8	1	O2	5		CO2	3	H2O	4				燃焼
C4H10	2	O2	13		CO2	8	H2O	10				燃焼
CH3OH	2	O2	3		CO2	2	H2O	4				燃焼
CH4	1	O2	2		CO2	1	H2O	2				燃焼
CO	2	O2	1		CO2	2						燃焼
H2	2	O2	1		H2O	2						燃焼
Mg	2	O2	1		MgO	2						燃焼
S	1	O2	1		SO2	1						燃焼
H2S	2	O2	3		SO2	2	H2O	2				燃焼
Zn	2	O2	1		ZnO	2						燃焼
Mg	3	N2	1		Mg3N2	1						燃焼
C	2	O2	1		CO	2						燃焼２`;


