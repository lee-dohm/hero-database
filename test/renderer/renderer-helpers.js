export function waitsForPromise (done, fn) {
  fn().then(() => {
    done()
  })
}
