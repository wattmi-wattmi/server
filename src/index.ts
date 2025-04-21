import 'module-alias/register';
import app from "@src/configs/app";
import env_config from '@src/configs/env';

app.listen(env_config.port, () => {
    console.log("Server is running on port 8000");
})