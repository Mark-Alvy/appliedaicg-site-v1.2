import re,base64,glob
html=open('dist/index.html').read()
css=open(glob.glob('dist/assets/*.css')[0]).read()
js=open(glob.glob('dist/assets/*.js')[0]).read()
def b64(p): return 'data:image/png;base64,'+base64.b64encode(open(p,'rb').read()).decode()
for n in ('mark','logo'):
    js=js.replace(f'`/{n}.png`', '`'+b64(f'dist/{n}.png')+'`')
html=re.sub(r'<script type="module" crossorigin src="/assets/[^"]+"></script>','',html)
html=re.sub(r'<link rel="stylesheet" crossorigin href="/assets/[^"]+">','<style>'+css+'</style>',html)
html=html.replace('href="/favicon.png"','href="'+b64('dist/favicon.png')+'"')
html=html.replace('</body>','<script type="module">'+js.replace('</script>','<\\/script>')+'</script></body>')
open('preview.html','w').write(html)
