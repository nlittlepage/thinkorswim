# ADX with Color Change

declare lower;

input length = 21;
input averageType = AverageType.WILDERS;
def cnl = 14;

plot ADX = DMI(length, averageType).ADX;
ADX.DefineColor("Highest", Color.YELLOW);
ADX.DefineColor("Lowest", Color.RED);
ADX.AssignNormGradientColor(cnl, ADX.Color("Lowest"), ADX.Color("Highest"));