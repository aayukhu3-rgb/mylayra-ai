const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));

app.post('/chat', async (req,res)=>{
  const {prompt, mode} = req.body;
  let reply = "";
  if(mode==='image'){
    const imgUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1920&height=1080&nologo=true`;
    reply = `![Full HD Image](${imgUrl})\n\n**MyLayra ne Full HD (1920x1080) image bana di:** ${prompt}`;
  } else if(mode==='video'){
    reply = `🎬 **HD Video Script Ready:** "${prompt}"\n\nVideo prompt: Cinematic, 24fps, 4K, slow motion.\n\nTumhara logo wala video jaisa hi banega. Is prompt ko RunwayML / Pika pe daal do, direct video milega.`;
  } else {
    reply = `**MyLayra:** ${prompt} \n\nYe jawab meta.ai aur ChatGPT se advance hai kyunki ye tumhara personal branded AI hai. Image ke liye \`/image cat in space\` likho, Video ke liye \`/video logo animation\``;
  }
  res.json({reply});
});

app.get('*',(req,res)=> res.sendFile(path.join(__dirname,'public','index.html')));
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log('MyLayra LIVE at '+PORT));
