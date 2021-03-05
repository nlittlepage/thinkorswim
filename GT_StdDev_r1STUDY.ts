declare lower;
declare zerobase;

input length = 21;
input posDev = 2.0;
input negDev = -2.0;
input price = close;
input allowNegativeValues = yes;

plot ZeroLine = 0;
ZeroLine.SetDefaultColor(Color.DARK_ORANGE);
ZeroLine.SetPaintingStrategy(PaintingStrategy.DASHES);
ZeroLine.HideBubble();

def rawRelVol = (volume - Average(volume, length)) / StDev(volume, length);
plot RelVol = if allowNegativeValues then rawRelVol else Max(0, rawRelVol);
RelVol.SetPaintingStrategy(PaintingStrategy.LINE_VS_SQUARES);
RelVol.SetLineWeight(2);
RelVol.DefineColor("Above", Color.RED);
RelVol.DefineColor("Below", Color.GREEN);
RelVol.AssignValueColor(if RelVol >= posDev then RelVol.Color("Above") else if RelVol <= negDev then RelVol.Color("Above") else RelVol.Color("Below"));

def RawStdDev = (price - Average(price, length)) / stdev(price, length);
plot PriceStdDev = if allowNegativeValues then RawStdDev else Max(0, RawStdDev);
PriceStdDev.SetPaintingStrategy(PaintingStrategy.HISTOGRAM);
PriceStdDev.SetLineWeight(2);
PriceStdDev.DefineColor("Above", Color.YELLOW);
PriceStdDev.DefineColor("Below", Color.DARK_ORANGE);
PriceStdDev.AssignValueColor(if PriceStdDev >= posDev then PriceStdDev.Color("Above") else if PriceStdDev <= negDev then PriceStdDev.Color("Above") else PriceStdDev.Color("Below"));
