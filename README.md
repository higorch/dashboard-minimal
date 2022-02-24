# Dashbord minimal

The dashbord template open source for your project.

# Dragdrop upload files

```bash
<div class="area-upload" id="myfiles">
    <div class="box-attach">
        <label>
            <div class="icon">
                <i class="fas fa-cloud-upload-alt"></i>
            </div>
            <div class="desc">Drag and drop files
            <span class="or">OR</span>
            <div class="btn-choose btn btn-blue text-white">
                Choose the files
                <input type="file" multiple>
            </div>
        </label>
    </div>
    <div class="box-files"></div>
</div>

// upload files drap and drop
var myfiles = $("#myfiles").attachFilesDragDrop({
    accept: '.png,.jpg,.jpeg,.pdf,.xsls', // file extension
    size: '1.5', // size in MB
    showBtnDelete: true, // true or false
    urlUpload: 'http://domain.com/upload-attachment.php', // use for ajax upload
    urlDelete: 'http://domain.com/delete-attachment.php', // use for ajax delete
    getFiles: function (files) { // get all files
        console.log(files);
    },
    getUploaded: function (item) { // use for ajax
        item.find('.actions a.delete').addClass('active');
    },
    processUpload: function () {  // use for ajax
        $("#attachments").parents('.content').addClass('loading-placeholder');
    },
    successUpload: function () {  // use for ajax
        $("#attachments").parents('.content').removeClass('loading-placeholder');
    },
    deletedUpload: function (status, response) {  // use for ajax
        switch (status) {
            case 'done':
                alert('Delete success: ' + response.msg);
                break;
            case 'fail':
                alert('Delete fail: ' + response.msg);;
                break;
        }
    }
});

// get all ajax uploaded files id
myfiles.getUploadedFiles();

// clear preview area
myfiles.removeAllPreview();
```

## Events

- Opened modal

```bash
$("#modal").on('opened', function(e) {
    alert('modal open');
});
```

- Closed modal

```bash
$("#modal").on('closed', function(e) {
    alert('modal close');
});
```

#### Bundle default libs

- jQuery
- [jQuery match height](https://brm.io/jquery-match-height)