import mongoose from "mongoose"
import passportLocalMongoose from "passport-local-mongoose";

// 스키마 생성
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatarUrl:String,
  facebookId: Number,
  githubId: Number
  // 소셜 계정을 위한 ID를 써넣는다.
  // 예를들어 누군가 깃헙 계정으로 로그인하면 그의 깃헙ID를 저장하려는 것 이다.
  // 그래서 나중에는 이 모든 것을 하나의 사용자로 묶어줄 수 있게된다.
  // 예를들어 내가 이메일을써서 로그인 하려고 하는데, 알고보니 이미 깃헙 계정으로도 가입했다는 것이 확인되면, 이미 로그인이 되어있음을 알려줄 수 있다.
  // 계정을 깃헙이나 페북 등 다른서비스를 통해 가입이 가능하고 이렇게 만든 계정들에는 패스워드가 없을 것 이다.

  // 어떻게? 사용자 정보에 이메일도 저장하고, 소셜계정도 저장하면 가능
});

// 스키마 추가
UserSchema.plugin(passportLocalMongoose, {usernameField: 'email'});

const model = mongoose.model("User", UserSchema);

export default model;