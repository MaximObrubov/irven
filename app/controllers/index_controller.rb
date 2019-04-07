class IndexController < ApplicationController
  before_action :set_verbs

  def index
    
  end


  private

  def set_verbs
    @verbs = Verb.all
  end
end
