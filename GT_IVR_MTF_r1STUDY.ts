## Copyright (c) 2019 - 2021 Hex Ventures, LLC ##

declare lower;
declare hide_on_intraday;

## Standard Variables
input ts = {"Year", "Semester", default "Quarter", "Month"};
def avgtypSIM = AverageType.SIMPLE;
def o = open;
def h = high;
def l = low;
def c = close;
def hlc = ( h + l + c) / 3;
def vl = volume;
def ob = 80;
def os = 20;
def ml = 50;
def sdp = 2.0;
def sdn = -2.0;
def zl = 0;
def pw = 5;
def pm = 21;
def pq = 63;
def ps = 126;
def py = 252;
def ofs = 1;

## Define Imp_volatility
def iv = if (GetSymbol() == "/ES") then close("VIX") / 100
else if (GetSymbol() == "/CL") then close("OIV") / 100 
else if (GetSymbol() == "/GC") then close("GVX") / 100 
else if (GetSymbol() == "/SI") then close("VXSLV") / 100 
else if (GetSymbol() == "/NQ") then close("VXN") / 100 
else if (GetSymbol() == "/TF") then close("RVX") / 100 
else if (GetSymbol() == "/YM") then close("VXD") / 100 
else if (GetSymbol() == "/6E") then close("EVZ") / 100 
else if (GetSymbol() == "/6J") then close("JYVIX") / 100 
else if (GetSymbol() == "/6B") then close("BPVIX") / 100 
else if (GetSymbol() == "/ZN") then close("TYVIX") / 100 
else if (GetSymbol() == "/ZW") then close("WIV") / 100
else if (GetSymbol() == "/ZB") then imp_volatility("TLT") 
else if (GetSymbol() == "/ZC") then imp_volatility("CORN") 
else if (GetSymbol() == "/ZS") then imp_volatility("SOYB") 
else if (GetSymbol() == "/KC") then imp_volatility("JO") 
else if (GetSymbol() == "/NG") then imp_volatility("UNG") 
else if (GetSymbol() == "/6S") then imp_volatility("FXF") 
else imp_volatility();

## Define IVR
def ivng = if !IsNaN(iv) then iv else iv[-1];

plot ivr = if IsNaN(c) then Double.NaN else ivng;
ivr.SetPaintingStrategy(PaintingStrategy.LINE);
ivr.SetDefaultColor(Color.YELLOW);
ivr.SetLineWeight(2);

## Define Quarter and Yearly Averages
plot pqiv = MovingAverage(avgtypSIM, ivr, pq);
pqiv.SetDefaultColor(Color.GREEN);
pqiv.HideBubble();
plot pyiv = MovingAverage(avgtypSIM, ivr, py);
pyiv.SetDefaultColor(Color.RED);
pyiv.HideBubble();

## Labels
## Monthly
def pmivH = Round(Highest(ivr, pm), 3);
def pmivL = Round(Lowest(ivr, pm), 3);
def pmivM = ( pmivH + pmivL ) / 2;
def pmivRN = pmivH - pmivL;
def pmivr =  if IsNaN(Round(((ivr - pmivL) / pmivRN) * 100.0, 0)) then Double.NaN else Round(((ivr - pmivL) / pmivRN) * 100.0, 0) ;

## Quartly
def pqivH = Round(Highest(ivr, pq), 3);
def pqivL = Round(Lowest(ivr, pq), 3);
def pqivM = ( pqivH + pqivL ) / 2;
def pqivRN = pqivH - pqivL;
def pqivr =  if IsNaN(Round(((ivr - pqivL) / pqivRN) * 100.0, 0)) then Double.NaN else Round(((ivr - pqivL) / pqivRN) * 100.0, 0) ;

## Semester
def psivH = Round(Highest(ivr, ps), 3);
def psivL = Round(Lowest(ivr, ps), 3);
def psivM = ( psivH + psivL ) / 2;
def psivRN = psivH - psivL;
def psivr =  if IsNaN(Round(((ivr - psivL) / psivRN) * 100.0, 0)) then Double.NaN else Round(((ivr - psivL) / psivRN) * 100.0, 0) ;

## Yearly
def pyivH = Round(Highest(ivr, py), 3);
def pyivL = Round(Lowest(ivr, py), 3);
def pyivM = ( pyivH + pyivL ) / 2;
def pyivRN = pyivH - pyivL;
def pyivr = if IsNaN(Round(((ivr - pyivL) / pyivRN) * 100.0, 0)) then Double.NaN else Round(((ivr - pyivL) / pyivRN) * 100.0, 0) ;

AddLabel(yes, ("Y: " + pyivr + "%"), if pyivr > 50.5 then Color.GREEN else Color.RED);
AddLabel(yes, ("S: " + psivr + "%"), if psivr > 50.5 then Color.GREEN else Color.RED);
AddLabel(yes, ("Q: " + pqivr + "%"), if pqivr > 50.5 then Color.GREEN else Color.RED);
AddLabel(yes, ("M: " + pmivr + "%"), if pmivr > 50.5 then Color.GREEN else Color.RED);

# Define Scale
def hn;
def ln;
def mn;
switch (ts) {
case "Month":
    hn = pmivH;
    ln = pmivL;
    mn = pmivM;
case "Quarter":
    hn = pqivH;
    ln = pqivL;
    mn = pqivM;
case "Semester":
    hn = psivH;
    ln = psivL;
    mn = psivM;
case "Year":
    hn = pyivH;
    ln = pyivL;
    mn = pyivM;
}

# Scale
plot hh = if IsNaN(hn) then Double.NaN else hn;
hh.SetPaintingStrategy(PaintingStrategy.LINE);
hh.SetDefaultColor(Color.DARK_ORANGE);
hh.SetStyle(Curve.FIRM);
hh.HideBubble();

plot ll = if IsNaN(ln) then Double.NaN else ln;
ll.SetPaintingStrategy(PaintingStrategy.LINE);
ll.SetDefaultColor(Color.DARK_ORANGE);
ll.SetStyle(Curve.FIRM);
ll.HideBubble();

plot mm = if IsNaN(mn) then Double.NaN else mn;
mm.SetPaintingStrategy(PaintingStrategy.LINE);
mm.SetDefaultColor(Color.LIGHT_ORANGE);
mm.SetStyle(Curve.SHORT_DASH);
mm.HideBubble();