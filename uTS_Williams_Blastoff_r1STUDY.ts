# Blast Off Indicator
# Should use on the Daily chart
# Assembled by BenTen at useThinkScript.com
# Converted from https://www.tradingview.com/script/V9Mi6eOO-CM-Blast-Off-V1-Alerts-Ready/

input trig = 21;
input paintbar = yes;

def val = absValue(close - open);
def range = high - low;
def blastOffVal = (val / range) * 100;
def trigger = trig;
def alert1 = blastOffVal < trig;
def col = blastOffVal < trig;

assignPriceColor(if paintbar and blastOffVal<trig then Color.MAGENTA else Color.Current);

# Plot Arrow
plot arrow = col;
arrow.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
arrow.SetDefaultColor(Color.CYAN);
arrow.SetLineWeight(1);