from pathlib import Path
from PIL import Image, ImageDraw, ImageOps
root=Path('output/playwright/quality-recovery')
names=['home','projects','distributed-chat-system','j-minus-minus-mips-compiler','fullstack-restaurant-system','occluded-pet-detection','genetic-algorithm-hyperparameter-finder','raspberry-pi-bare-metal','climate-control-simulation','kiddoflix','ai-scheduling-hard-constraints','experience','snap-remedy','resume']
for width in [320,390,768,1280,1600]:
    for start in range(0,len(names),4):
        tiles=[]
        for name in names[start:start+4]:
            source=root/f'final-{name}-{width}-top.png'
            if not source.exists():continue
            im=Image.open(source).convert('RGB'); im=ImageOps.contain(im,(390,620))
            tile=Image.new('RGB',(390,im.height+30),'white');tile.paste(im,(0,30));ImageDraw.Draw(tile).text((8,8),name,fill='black');tiles.append(tile)
        if not tiles:continue
        sheet=Image.new('RGB',(390*len(tiles),max(im.height for im in tiles)), '#eeeeee')
        for i,im in enumerate(tiles):sheet.paste(im,(390*i,0))
        sheet.save(root/f'contact-tops-{width}-{start//4+1}.png')
# Read mobile full pages in sequential columns so paragraph spacing stays visible.
for name in names:
    path=root/f'final-{name}-390-full.png'
    if not path.exists():continue
    im=Image.open(path).convert('RGB')
    for start in range(0,im.height,3600):
        end=min(im.height,start+3600); columns=(end-start+1199)//1200
        sheet=Image.new('RGB',(im.width*columns,1230),'#eeeeee')
        draw=ImageDraw.Draw(sheet)
        for i in range(columns):
            top=start+1200*i;crop=im.crop((0,top,im.width,min(top+1200,im.height)))
            sheet.paste(crop,(im.width*i,30));draw.text((im.width*i+8,8),f'{name} / y={top}',fill='black')
        sheet.save(root/f'contact-body-{name}-{start//3600+1}.png')
