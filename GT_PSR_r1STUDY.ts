# Wolf Waves 
# Mobius 
# V01.05.22.2018
# GruntTrader #
# Modified by Hex Ventures, LLC V01.05.14.2019 #
 
# User Inputs 
input n = 21; 

# Internal Script Reference 
script LinePlot {
    input BarID = 0;
    input Value = 0;
    input BarOrigin = 0;
    def ThisBar = HighestAll(BarOrigin);
    def ValueLine = if BarOrigin == ThisBar 
                then Value 
                else Double.NaN;
    plot P = if ThisBar - BarID <= BarOrigin 
             then HighestAll(ValueLine) 
             else Double.NaN;
} 

# Variables 
def o = open;
def c = close;
def h = high;
def l = low;
def hm = Max(o, c);
def lm = Min(o, c);
def x = BarNumber();
def xN = x == HighestAll(x);
 
# R1 
def hh = fold i = 1 to n + 1  
         with p = 1 
         while p  
         do hm > GetValue(hm, -i);

def PivotH = if (x > n and  
                 hm == Highest(hm, n) and  
                 hh)
             then hm  
             else Double.NaN;

def PHValue = if !IsNaN(PivotH)  
              then PivotH  
              else PHValue[1];

def PHBarOrigin = if !IsNaN(PivotH)  
                  then x  
                  else PHBarOrigin[1];

def PHBarID = x - PHBarOrigin; 

# R2 

def R2PHValue = if PHBarOrigin != PHBarOrigin[1] 
                then PHValue[1] 
                else R2PHValue[1];

def R2PHBarOrigin = if PHBarOrigin != PHBarOrigin[1] 
                    then PHBarOrigin[1]  
                    else R2PHBarOrigin[1];

def R2PHBarID = x - R2PHBarOrigin; 

# R3 

def R3PHValue = if R2PHBarOrigin != R2PHBarOrigin[1] 
                then R2PHValue[1] 
                else R3PHValue[1];

def R3PHBarOrigin = if R2PHBarOrigin != R2PHBarOrigin[1] 
                    then R2PHBarOrigin[1]  
                    else R3PHBarOrigin[1];

def R3PHBarID = x - R3PHBarOrigin; 

# S1 
def ll = fold j = 1 to n + 1  
         with q = 1 
         while q  
         do lm < GetValue(lm, -j);

def PivotL = if (x > n and  
                 lm == Lowest(lm, n) and 
                 ll) 
             then lm  
             else Double.NaN;

def PLValue = if !IsNaN(PivotL)  
              then PivotL  
              else PLValue[1];

def PLBarOrigin = if !IsNaN(PivotL)  
                  then x  
                  else PLBarOrigin[1];

def PLBarID = x - PLBarOrigin; 

# S2 

def S2PLValue = if PLBarOrigin != PLBarOrigin[1] 
                then PLValue[1] 
                else S2PLValue[1];

def S2PLBarOrigin = if PLBarOrigin != PLBarOrigin[1] 
                    then PLBarOrigin[1] 
                    else S2PLBarOrigin[1];

def S2PLBarID = x - S2PLBarOrigin; 

# S3 

def S3PLValue = if S2PLBarOrigin != S2PLBarOrigin[1] 
                then S2PLValue[1] 
                else S3PLValue[1];

def S3PLBarOrigin = if S2PLBarOrigin != S2PLBarOrigin[1] 
                    then S2PLBarOrigin[1] 
                    else S3PLBarOrigin[1];

def S3PLBarID = x - S3PLBarOrigin; 

# S4 

def S4PLValue = if S3PLBarOrigin != S3PLBarOrigin[1] 
                then S3PLValue[1] 
                else S4PLValue[1];

def S4PLBarOrigin = if S3PLBarOrigin != S3PLBarOrigin[1] 
                    then S3PLBarOrigin[1] 
                    else S4PLBarOrigin[1];

def S4PLBarID = x - S4PLBarOrigin; 

# S5 

def S5PLValue = if S4PLBarOrigin != S4PLBarOrigin[1] 
                then S4PLValue[1] 
                else S5PLValue[1];

def S5PLBarOrigin = if S4PLBarOrigin != S4PLBarOrigin[1] 
                    then S4PLBarOrigin[1] 
                    else S5PLBarOrigin[1];

def S5PLBarID = x - S5PLBarOrigin;
 
# Plots 
plot R1 = LinePlot(BarID = PHBarID,  
                   Value = PHValue,  
                   BarOrigin = PHBarOrigin);
R1.SetDefaultColor(Color.MAGENTA);
#R1.AssignValueColor(if c < R1 then Color.CYAN else Color.MAGENTA);
R1.HideBubble();
AddChartBubble(x == HighestAll(PHBarOrigin), PHValue, "R1", Color.MAGENTA, 1);

plot R2 = LinePlot(BarID = R2PHBarID,  
                   Value = R2PHValue,  
                   BarOrigin = R2PHBarOrigin);
R2.SetDefaultColor(Color.MAGENTA);
#R2.AssignValueColor(if c < R2 then Color.CYAN else Color.MAGENTA);
R2.HideBubble();
AddChartBubble(x == HighestAll(R2PHBarOrigin), PHValue, "R2", Color.MAGENTA, 1);

plot R3 = LinePlot(BarID = R3PHBarID,  
                   Value = R3PHValue,  
                   BarOrigin = R3PHBarOrigin);
R3.SetDefaultColor(Color.MAGENTA);
#R3.AssignValueColor(if c < R3 then Color.CYAN else Color.MAGENTA);
R3.HideBubble();
AddChartBubble(x == HighestAll(R3PHBarOrigin), PHValue, "R3", Color.MAGENTA, 1);

plot S1 = LinePlot(BarID = PLBarID,  
                   Value = PLValue,  
                   BarOrigin = PLBarOrigin);
S1.SetDefaultColor(Color.CYAN);
S1.HideBubble();
AddChartBubble(x == HighestAll(PLBarOrigin), PLValue, "S1", Color.CYAN, 0);

plot S2 = LinePlot(BarID = S2PLBarID,  
                   Value = S2PLValue,  
                   BarOrigin = S2PLBarOrigin);
S2.SetDefaultColor(Color.CYAN);
S2.HideBubble();
AddChartBubble(x == HighestAll(S2PLBarOrigin), PLValue, "S2", Color.CYAN, 0);

plot S3 = LinePlot(BarID = S3PLBarID,  
                   Value = S3PLValue,  
                   BarOrigin = S3PLBarOrigin);
S3.SetDefaultColor(Color.CYAN);
S3.HideBubble();
AddChartBubble(x == HighestAll(S3PLBarOrigin), PLValue, "S3", Color.CYAN, 0);

Alert(c crosses below S1, "Below S1", Alert.BAR, Sound.Bell);
Alert(c crosses above R1, "Above R1", Alert.BAR, Sound.Bell);
Alert(c crosses below S2, "Below S2", Alert.BAR, Sound.Bell);
Alert(c crosses above R2, "Above R2", Alert.BAR, Sound.Bell);
Alert(c crosses below S3, "Below S3", Alert.BAR, Sound.Bell);
Alert(c crosses above R3, "Above R3", Alert.BAR, Sound.Bell);
