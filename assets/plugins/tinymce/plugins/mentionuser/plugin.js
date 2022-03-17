(function () {

    'use strict'

    tinymce.PluginManager.add('mentionuser', function (editor, url) {

        let usersIds = []

        // js str capitalize
        let strCapitalize = function (str) {

            let strLowerCase = str.toLowerCase()
            let arr = strLowerCase.split(' ');
            let result = [];

            arr.forEach(function (str, index) {

                if (index == 0) {
                    result = str.replace(/^\w/, (c) => c.toUpperCase())
                }

                if (index > 0) {
                    result += ' ' + str.replace(/^\w/, (c) => c.toUpperCase())
                }

            })

            return result;
        }

        // watch the user at update
        let watchUsersAtUpdate = function (spnTagsAt) {

            if (spnTagsAt.length == 0) {
                usersIds = []
            } else {

                let arr = []

                spnTagsAt.forEach(function (el, index) {
                    arr.push(el.dataset.id)
                })

                usersIds = arr
            }

            editor.execCallback('mention_users_selected', usersIds)

        }

        // format at "@userLastname"
        let formatAt = function (at) {

            let arr = at.split('-');
            let result;

            arr.forEach(function (str, index) {

                if (index == 0) {
                    result = str;
                }

                if (index > 0) {
                    result += str;
                }
            })

            return result;
        }

        // list mention_users param end filter users
        let getUsers = function (pattern) {

            let users = editor.getParam('mention_users');

            return users.filter(function (user) {
                let at = user.at.toLowerCase()
                let search = pattern.toLowerCase()
                return at.includes(search)
            })
        }

        // lead plugin style.css file
        let loadStyleshet = function () {
            let fileref = document.createElement("link")
            fileref.rel = "stylesheet"
            fileref.type = "text/css"
            fileref.href = `${url}/style.css?v=${new Date().getTime()}`
            document.getElementsByTagName("head")[0].appendChild(fileref)
        }

        editor.on('keyup', function (e) {

            let keycode = e.keyCode;
            let el = e.target;

            let spnTagsAt = el.querySelectorAll('span.mention.tag.at')

            if (keycode === 8 || keycode === 46) {

                watchUsersAtUpdate(spnTagsAt)

            }
        });

        editor.ui.registry.addAutocompleter('mentionuser', {
            ch: '@',
            minChars: 1,
            columns: 1,
            highlightOn: ['mention_at'],
            fetch: function (pattern) {
                return new tinymce.util.Promise(function (resolve) {

                    let results = getUsers(pattern).map(function (user) {

                        var avatar = user.avatar ? window.location.origin + '/' + user.avatar.path : url + '/profile-default.png';

                        return {
                            type: 'cardmenuitem',
                            value: user.id + "|" + user.at + "|" + user.name,
                            items: [
                                {
                                    type: 'cardimage',
                                    src: avatar,
                                    classes: ['tox-mention__avatar'],
                                },
                                {
                                    type: 'cardcontainer',
                                    direction: 'vertical',
                                    items: [
                                        {
                                            type: 'cardtext',
                                            text: `@${formatAt(user.at)}`,
                                            name: 'mention_at',
                                            classes: ['tox-mention__name'],
                                        },
                                    ]
                                }
                            ]
                        }
                    });

                    resolve(results)

                });
            },
            onAction: function (autocompleteApi, rng, value) {

                let parts = value.split('|')

                let id = parts[0]
                let at = parts[1]
                let name = parts[2]

                usersIds.push(id)

                let content = `<span class="mention tag at" title="${strCapitalize(name)}" data-id="${id}" contenteditable="false">@${formatAt(at)}</span>`

                editor.selection.setRng(rng)
                editor.insertContent(content)
                editor.execCallback('mention_users_selected', usersIds)

                autocompleteApi.hide()
            }
        });

        loadStyleshet()

        return {
            getMetadata: function () {
                return {
                    name: 'Mention Uset At',
                    url: 'https://example.com/docs/customplugin'
                }
            }
        }
    })

})()
