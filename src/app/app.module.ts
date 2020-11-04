import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SentBubbleComponent } from './sent-bubble/sent-bubble.component';
import { InputBoxComponent } from './input-box/input-box.component';
import { KeywordsSettingComponent } from './keywords-setting/keywords-setting.component';
import { ChatComponent } from './chat/chat.component';
import { RecieveBubbleComponent } from './recieve-bubble/recieve-bubble.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [					
    AppComponent,
      SentBubbleComponent,
      InputBoxComponent,
      KeywordsSettingComponent,
      ChatComponent,
      RecieveBubbleComponent,
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
