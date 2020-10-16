# banana.orange.org
Welcome to banana.orange.org's world!
Suspendisse nibh orci, bibendum vel vehicula at, vestibulum quis sem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pharetra a ante et volutpat. Aenean non metus et odio venenatis ornare ut et justo. Fusce dapibus ligula nec ex aliquam, eu venenatis magna euismod. Cras semper eget leo quis cursus. Sed sodales fermentum erat. Nulla maximus posuere venenatis. Sed rhoncus dui nulla, eget posuere tellus placerat sit amet. Etiam eleifend at est a luctus. Sed imperdiet mi et urna lobortis, eget tempus arcu pulvinar. Nullam id venenatis tellus, a scelerisque dui. Proin vitae dignissim sapien. Nullam sed aliquet nibh. Donec hendrerit fermentum tortor pulvinar pulvinar. Morbi porta sagittis ipsum, vitae vestibulum sapien faucibus nec.

Mauris id eros vel ipsum scelerisque vulputate. Vestibulum non justo convallis, suscipit dui ac, dictum ligula. Quisque nisi turpis, malesuada feugiat felis eget, blandit commodo est. Cras sit amet justo ut elit hendrerit ultricies. Donec posuere dolor eget orci aliquet, ac pretium lorem varius. Nam massa nibh, egestas vel maximus quis, bibendum a lectus. Curabitur dolor lorem, varius ac nisl et, mattis luctus neque. Ut semper massa a tortor lobortis vestibulum. Curabitur ut arcu est. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Ut elementum congue nulla at finibus. Aenean sed magna scelerisque velit porta iaculis. Cras viverra augue ligula, sodales pellentesque dui semper vel. Sed accumsan est purus, et semper lacus efficitur ultricies.

Pellentesque feugiat iaculis nisi at dignissim. Nulla facilisi. Aenean varius convallis gravida. Curabitur viverra dignissim elit at rhoncus. Nulla egestas sem leo, sed pretium ex euismod sed. Phasellus scelerisque facilisis sapien, a congue est porta dictum. Duis ante erat, lobortis vitae bibendum quis, dapibus ut nisi. Pellentesque blandit orci et tortor efficitur consequat.

Sed a tincidunt purus, a luctus eros. Praesent mollis facilisis mauris, eu porta ex finibus id. Vivamus aliquam odio sit amet tortor molestie, id placerat augue ultrices. Pellentesque et aliquet ligula. Suspendisse neque ligula, consectetur at ultrices eget, cursus id enim. Maecenas dictum sem quis libero facilisis, et consectetur velit cursus. Fusce auctor nisi ante, ac dapibus urna semper in. Suspendisse sit amet nibh lacinia, sollicitudin tellus et, venenatis elit. Curabitur luctus, ante non molestie sollicitudin, nisi mauris rhoncus urna, nec dapibus ipsum quam sed eros. Aenean tincidunt pretium ex sit amet semper. Donec ultrices dui euismod consequat malesuada. Etiam vel eros nulla. Sed sed nunc in quam tristique pulvinar eget pharetra orci. Vestibulum ornare, nibh sed ornare tristique, massa enim porttitor urna, eu dapibus lectus lectus at ex. Sed sollicitudin mi vel lorem dignissim semper. In molestie pellentesque elementum.

Cras ullamcorper vitae erat ac varius. Vestibulum a sollicitudin ipsum, vitae posuere augue. Donec vitae mauris at purus sagittis fringilla eget eget turpis. Morbi eu turpis velit. Sed at turpis blandit, vehicula felis sed, faucibus arcu. Curabitur tincidunt diam nibh, eget luctus felis maximus id. Aliquam varius gravida mauris quis pretium.

Morbi pellentesque urna ac ligula efficitur, sit amet tincidunt sapien ullamcorper. Mauris porta condimentum mauris, at suscipit enim rhoncus nec. Phasellus id tincidunt dui.
## 使用介紹
- 本專案使用podman容器（把它想得跟docker很像）
## 使用流程
1. Build出Image。方法：
    ```
    ./podman_build.sh {取一個名稱}
    ```
2. Build出Image後，用其產生container。方法：
    ```
    ./podman_run.sh {你取的image的名稱}
    ```
3. 上一步做完你應該就進去container了。接下來就是把server跑起來。方法：
    ```
   ./start_server.sh
   ```
備註：
- 怎麼離開：試試Ctrl+D,或把terminal關掉XD（你懂的）。
- 關於podman產生的image跟container怎麼刪除，就問Google大神囉。
